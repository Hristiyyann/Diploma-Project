const { Op } = require("sequelize");
const {User, UserRole, UserToken} = require('../utils/models');
const {addTokensToDB, getRoles} = require('../utils/helpers');
const {ValidationError, ResourceError} = require('../utils/errors');
const config = require('../utils/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function signUp(req, res) 
{
    const {firstName, lastName, emailAddress, password, telephoneNumber} = req.body;

    const user = await User.findOne(
    {
        where: 
        {
            telephone_number: telephoneNumber
        }
    });

    if(user && !user.is_verified) throw new ValidationError("You have to verify your telephone number!", 403)
    else if(user) throw new ValidationError("You have to log in", 403); 

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

    console.log(JSON.stringify(newUser));
    res.status(200).send({success: true, userId: newUser.id});
}

async function signIn(req, res) 
{
    const {telephoneNumber, emailAddress, password} = req.body;
    const conditions = {};

    if(telephoneNumber) conditions.where = {...conditions.where, telephone_number: telephoneNumber};
    else if(emailAddress) conditions.where = {...conditions.where, email_address: emailAddress};
    else throw new ResourceError("There aren't provided credentials", 403); 

    const user = await User.findOne(conditions);
    const result = await bcrypt.compare(password, user.password);

    if(!user) throw new ResourceError("This user does not exist", 403);
    else if(!result) throw new ValidationError("Password is incorrect", 403); 
    else if(user && !user.is_verified)  throw new ValidationError("You have to verify your telephone number", 403);

    const roles = await getRoles(user.id);

    const accessToken = jwt.sign(
    {userId:    user.id, roles}, 
    config.accessTokenSecret,
    {expiresIn: '1h'});

    const refreshToken = jwt.sign(
    {userId:user.id},
    config.refreshTokenSecret);

    addTokensToDB(user.id, accessToken, refreshToken);

    res.status(200).send({roles, accessToken, refreshToken});
}    

async function verify(req, res)
{
    const{smsCode, userId} = req.body;
    
    if(!(smsCode == 2323)) throw new ValidationError("This code is incorrect", 403);

    const user = await User.findByPk(userId);

    if(user.is_verified)  throw new ValidationError("This user is already verified!", 400);
    else if(!user) throw new ResourceError("This user does not exist");

    user.is_verified = true
    user.save(); 

    const records = await UserRole.create(
    {
        user_id: userId,
        role: UserRole.rawAttributes.role.values[0]
    }) 

    const accessToken = jwt.sign(
    {userId, roles: [records.role]}, 
    config.accessTokenSecret,
    {expiresIn: '1h'});

    const refreshToken = jwt.sign(
    {userId},
    config.refreshTokenSecret);

    addTokensToDB(userId, accessToken, refreshToken);

    res.status(200).send({role: [records.role], accessToken, refreshToken});
}

async function refreshToken(req,res)
{
    const {refreshToken} = req.body;

    if(!refreshToken) throw new ResourceError("There is no provided token", 403);

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
        console.log(JSON.stringify(user));
        const allConnectedTokens = await UserToken.destroy(
        {
            where:
            {
                user_id: user.userId
            }
        });
        
        return res.send({success: false, message: "Access denied"});
    }

    await UserToken.destroy({where:{token:refreshToken}});
    const roles = await getRoles(user.userId);
    
    const newAccessToken = jwt.sign(
    {userId: user.userId, roles}, 
    config.accessTokenSecret,
    {expiresIn: '1h'});

    const newRefreshToken = jwt.sign(
    {userId: user.userId},
    config.refreshTokenSecret);
    
    addTokensToDB(user.userId, newRefreshToken, newRefreshToken);

    return res.status(200).send({success: true, roles, accessToken: newAccessToken, refreshToken: newRefreshToken});
}

async function logOut(req, res)
{
    const {allDevices} = req.query;
    const {accessToken, refreshToken} = req.body;
    console.log(accessToken, refreshToken);
    const conditions = {};
    
    if(allDevices) conditions.where = {...conditions.where, user_id: req.userData.userId};
    else conditions.where = {...conditions.where, [Op.or] : [{token: accessToken}, {token: refreshToken}]};
    console.log(conditions);

    await UserToken.destroy(conditions);

    return res.status(200).send({success: true, message:"Tokens are invalidated!"});
}

module.exports = 
{
    signUp,
    signIn,
    verify,
    refreshToken,
    logOut,
};

