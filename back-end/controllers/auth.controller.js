const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, UserRole, UserToken} = require('../utils/models');
const {addTokensToDB, getRoles, throwError, signAccessToken, signRefreshToken} = require('../utils/helpers');
const {ValidationError, ResourceError} = require('../utils/errors');
const config = require('../utils/config');
const verification = require('../utils/telephone-number-verification');

async function signUp(req, res) 
{
    throwError(req);
    
    const {firstName, lastName, emailAddress, password, telephoneNumber} = req.body;

    const user = await User.findOne(
    {
        where: 
        {
            telephone_number: telephoneNumber
        }
    });

    if(user && !user.is_verified) 
    {
        await verification.sendOTP();
        throw new ValidationError('You have to verify your telephone number!', 403)
    }
    else if(user) throw new ValidationError('You have to log in', 401); 

    const passwordSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    const newUser = await User.create(
    {
        first_name: firstName,
        last_name: lastName,
        email_address: emailAddress,
        password: hashedPassword,
        telephone_number: telephoneNumber
    })

    await verification.sendOTP();

    console.log(JSON.stringify(newUser));
    res.status(200).send({success: true, userId: newUser.id});
}

async function signIn(req, res) 
{
    throwError(req);

    const {telephoneNumber, emailAddress, password} = req.body;
    const conditions = {};

    if(telephoneNumber) conditions.where = {...conditions.where, telephone_number: telephoneNumber};
    else if(emailAddress) conditions.where = {...conditions.where, email_address: emailAddress};
    else throw new ResourceError('There aren\'t provided credentials', 400); 

    const user = await User.findOne(conditions);
    if(!user) throw new ResourceError('Password or email address do not match', 400);
    else if(user && !user.is_verified)  
    {
        await verification.sendOTP();
        throw new ValidationError('You have to verify your telephone number', 403);
    }    
    
    const result = await bcrypt.compare(password, user.password);
    if(!result) throw new ValidationError('Password or email address do not match', 400); 
    const roles = await getRoles(user.id);

    const accessToken = signAccessToken(user.id, roles);
    const refreshToken = signRefreshToken(user.id);
    addTokensToDB(user.id, accessToken, refreshToken);

    res.status(200).send({roles, accessToken, refreshToken});
}    

async function verify(req, res)
{
    throwError(req);

    const{smsCode, userId} = req.body;
    
    const user = await User.findByPk(userId);
    
    if(!user) throw new ResourceError('This user does not exist', 400);
    else if(user.is_verified)  throw new ValidationError('This user is already verified!', 400);
    else if(!(await verification.checkOTP(smsCode))) throw new ValidationError('This code is incorrect', 400);

    user.is_verified = true
    user.save(); 

    const records = await UserRole.create(
    {
        user_id: userId,
        role: UserRole.rawAttributes.role.values[0]
    }) 

    const accessToken = signAccessToken(userId, [records.role]);
    const refreshToken = signRefreshToken(userId);
    addTokensToDB(userId, accessToken, refreshToken);

    res.status(200).send({role: [records.role], accessToken, refreshToken});
}

async function refreshToken(req,res)
{
    throwError(req);

    const {refreshToken} = req.body;

    if(!refreshToken) throw new ResourceError('There is no provided token', 400);

    const isTokenFound = await UserToken.findOne(
    {
        where: 
        {
            token: refreshToken
        }
    });

    const user = jwt.verify(refreshToken, config.refreshTokenSecret);
    
    if(!isTokenFound)
    {
        await UserToken.destroy(
        {
            where:
            {
                user_id: user.userId
            }
        });
        
        throw new ValidationError('Access denied', 403);
    }

    await UserToken.destroy({where:{token:refreshToken}});
    const roles = await getRoles(user.userId);
    
    const newAccessToken = signAccessToken(user.userId, roles);
    const newRefreshToken = signRefreshToken(user.userId);
    addTokensToDB(user.userId, newRefreshToken, newRefreshToken);

    return res.status(200).send({success: true, roles, accessToken: newAccessToken, refreshToken: newRefreshToken});
}

async function logOut(req, res)
{
    throwError(req);

    const {allDevices} = req.query;
    const {accessToken, refreshToken} = req.body;
    const conditions = {};
    
    if(allDevices) conditions.where = {...conditions.where, user_id: req.userData.userId};
    else conditions.where = {...conditions.where, [Op.or] : [{token: accessToken}, {token: refreshToken}]};

    await UserToken.destroy(conditions);

    return res.status(200).send({success: true, message:'Tokens are invalidated!'});
}

module.exports = 
{
    signUp,
    signIn,
    verify,
    refreshToken,
    logOut,
};