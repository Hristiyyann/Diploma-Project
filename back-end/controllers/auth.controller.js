const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserRole, UserToken } = require('../utils/models');
const { addTokensToDB, getRoles, throwError, signAccessToken, signRefreshToken } = require('../utils/helpers');
const { ValidationError, ResourceError } = require('../utils/errors');
const config = require('../utils/config');
const verification = require('../utils/telephone-number-verification');
const messages = require('../utils/thrown-error-messages');

async function signUp(req, res) 
{
    throwError(req);
    
    const { fullName, emailAddress, password, telephoneNumber } = req.body;

    const user = await User.findOne(
    {
        where: 
        {
            telephoneNumber
        }
    });

    if(user && !user.isVerified) 
    {
        await verification.sendOTP();
        throw new ValidationError(messages.verifyTelephoneNumber, 403)
    }
    else if(user) throw new ValidationError(messages.needLogIn, 401); 

    const passwordSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    const newUser = await User.create(
    {
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ')[1],
        emailAddress,
        password: hashedPassword,
        telephoneNumber
    })

    //await verification.sendOTP();

    console.log(JSON.stringify(newUser));
    res.status(200).send({ success: true, userId: newUser.id });
}

async function signIn(req, res) 
{
    throwError(req);

    const { telephoneNumber, emailAddress, password } = req.body;
    const conditions = {};

    if(telephoneNumber) conditions.where = {...conditions.where, telephoneNumber};
    else if(emailAddress) conditions.where = {...conditions.where, emailAddress};
    else throw new ResourceError(messages.noData, 400); 

    const user = await User.findOne(conditions);
    if(!user) throw new ResourceError(messages.dataNotMatch, 400);
    else if(user && !user.isVerified)  
    {
        //await verification.sendOTP();
        throw new ValidationError(messages.verifyTelephoneNumber, 403);
    }    
    
    const result = await bcrypt.compare(password, user.password);
    if(!result) throw new ValidationError(messages.dataNotMatch, 400); 
    const roles = await getRoles(user.id);

    const accessToken = signAccessToken(user.id, roles);
    const refreshToken = signRefreshToken(user.id);
    addTokensToDB(user.id, accessToken, refreshToken);

    res.status(200).send({ roles, accessToken, refreshToken });
}    

async function verify(req, res)
{
    throwError(req);

    const{ code, userId } = req.body;
    
    const user = await User.findByPk(userId);
    
    if(!user) throw new ResourceError(messages.userNotExists, 400);
    else if(user.isVerified)  throw new ValidationError(messages.userIsVerified, 400);
    else if(!(await verification.checkOTP(code))) throw new ValidationError(messages.incorrectCode, 400);

    user.isVerified = true
    user.save(); 

    const records = await UserRole.create(
    {
        userId,
        role: UserRole.rawAttributes.role.values[0]
    }) 

    const accessToken = signAccessToken(userId, [records.role]);
    const refreshToken = signRefreshToken(userId);
    addTokensToDB(userId, accessToken, refreshToken);

    res.status(200).send({ roles: [records.role], accessToken, refreshToken });
}

async function resend(req, res)
{
    await verification.sendOTP();
    res.status(200).send({ success: true })
}

async function refreshToken(req, res)
{
    throwError(req);

    const { refreshToken } = req.body;

    if(!refreshToken) throw new ResourceError(messages.noToken, 400);

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
                userId: user.userId
            }
        });
        
        throw new ValidationError(messages.noAccess, 403);
    }

    await UserToken.destroy({where: { token:refreshToken }});
    const roles = await getRoles(user.userId);
    
    const newAccessToken = signAccessToken(user.userId, roles);
    const newRefreshToken = signRefreshToken(user.userId);
    addTokensToDB(user.userId, newAccessToken, newRefreshToken);

    return res.status(200).send({ success: true, roles, accessToken: newAccessToken, refreshToken: newRefreshToken });
}

async function changePassword(req, res)
{
    const { currentPassword, newPassword } = req.body;
    const userId = req.userData.userId;

    const user = await User.findByPk(userId);

    if(!user) throw new ResourceError(messages.userNotExists, 400);

    if(currentPassword)
    {
        const result = await bcrypt.compare(currentPassword, user.password);
        if(!result) throw new ValidationError(messages.wrongPassword, 400); 
    }

    const passwordSalt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, passwordSalt);

    user.password = hashedNewPassword;
    user.save();

    res.status(200).send({success: true});
}

async function forgetPassword(req, res)
{
    const { password, telephoneNumber, emailAddress } = req.body;
    const conditions = {}

    if(telephoneNumber) { conditions.where = {...conditions.where, telephoneNumber}; }
    else if(emailAddress) { conditions.where = {...conditions.where, emailAddress}; }

    const user = await User.findOne(conditions);
    console.log(user.id);
    if(!user) { throw new ResourceError(messages.userNotExists, 400); }
    
    const passwordSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    user.password = hashedPassword;
    user.save();

    res.status(200).send({success: true});
}

async function passwordRecovery(req, res)
{
    const { telephoneNumber, emailAddress } = req.body;
    let conditions = {};

    if(emailAddress) 
    { 
        channel = 'email'; 
        conditions.where = {...conditions.where, emailAddress};
    }
    else if(telephoneNumber) 
    {
        channel = 'sms'; 
        conditions.where = {...conditions.where, telephoneNumber};
    }
    else { throw new ResourceError(messages.noData, 400); } 

    const user = await User.findOne(conditions);
    if(!user) { throw new ResourceError(messages.userNotExists, 400); }

    await verification.sendOTP();

    res.status(200).send({ success: true });
}

async function checkCode(req, res)
{
    const { code, emailAddress, telephoneNumber } = req.body;
    console.log(code, emailAddress, telephoneNumber);
   
    if(!(await verification.checkOTP(code))) throw new ValidationError(messages.incorrectCode, 400);
    
    res.status(200).send({ success: true });
}

async function logOut(req, res)
{
    throwError(req);

    const { allDevices } = req.query;
    const { accessToken, refreshToken } = req.body;
    const conditions = {};
    
    if(allDevices) conditions.where = {...conditions.where, userId: req.userData.userId};
    else conditions.where = {...conditions.where, [Op.or] : [{ token: accessToken }, { token: refreshToken }]};

    await UserToken.destroy(conditions);

    return res.status(200).send({ success: true, message: messages.invalidatedTokens });
}

module.exports = 
{
    signUp, signIn, verify, resend, refreshToken, changePassword,
    forgetPassword, passwordRecovery, checkCode, logOut,
};