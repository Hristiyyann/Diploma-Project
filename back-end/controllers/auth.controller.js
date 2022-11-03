const { Op } = require("sequelize");
const {User, UserRole, UserToken} = require('../utils/models');
const {addTokensToDB, getRoles} = require('../utils/helpers');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');

async function signUp(req, res) 
{
    try
    {
        const {firstName, lastName, emailAddress, password, telephoneNumber} = req.body;

        const user = await User.findOne(
        {
            where: 
            {
                telephone_number: telephoneNumber
            }
        });

        if(user && !user.is_verified) return res.status(400).send({success: false, message: "You have to verify your telephone_number!"});
        else if(user) return res.status(200).send({success: true, message: "You have to log in!"});

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
    catch(error) 
    {
        if(error.name == 'SequelizeUniqueConstraintError') res.status(403).send({success: false, message: "This email is already used"});
    }
}

async function signIn(req, res) 
{
    try
    {
        const {telephoneNumber, emailAddress, password} = req.body;
        const conditions = {};

        if(telephoneNumber) conditions.where = {...conditions.where, telephone_number: telephoneNumber};
        else if(emailAddress) conditions.where = {...conditions.where, email_address: emailAddress};
        else return res.status(403).send({success: true, message: "There aren't provided credentials"});

        const user = await User.findOne(conditions);

        if(!user) return res.status(404).send({success: false, message: "This user does not exist"});
        else if(user && !user.is_verified) return res.status(400).send({success: false, message: "You have to verify your telephone_number!"});

        const result = await bcrypt.compare(password, user.password);
    
        if(!result) return res.status(403).send({success: false, message: "Password is incorrect"});
    
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
    catch (error)
    {
        console.log(error);
    }
}    

async function verify(req, res)
{
    try 
    {
        const{smsCode, userId} = req.body;
        
        if(!(smsCode == 2323)) return res.status(403).send({success: false, message: "This code is incorrect! Try again!"});

        const user = await User.findByPk(userId);

        if(user.is_verified) return res.status(400).send({success: false, message: "This user is already verified!"});
        else if(!user) return res.status(404).send({success: false, message: "This user does not exist"});

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
    catch (error)
    {
        console.log(error);
    }
}

async function refreshToken(req,res)
{
    try
    {
        const {refreshToken} = req.body;

        if(!refreshToken) res.status(403).send({success: false, message:"There is no provided token"});

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
    catch(error)
    {
        if(error.name == 'JsonWebTokenError') return res.status(403).send({success: false, message: "Access denied"});
        console.log(error);
    }    
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

    try
    {
        await UserToken.destroy(conditions);

        return res.status(200).send({success: true, message:"Tokens are invalidated!"});
    }
    catch (error)
    {
        console.log(error);
    }
}

module.exports = 
{
    signUp,
    signIn,
    verify,
    refreshToken,
    logOut,
};

