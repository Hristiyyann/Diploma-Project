const { Op } = require("sequelize");
const {User, UserRole, UserToken} = require('../utils/models');
const {addTokenToDB} = require('../utils/helpers');
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

        const passwordSalt = await bcrypt.genSalt(16);
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

async function verify(req, res)
{
    try 
    {
        const{smsCode, userId} = req.body;
        
        if(!(smsCode == 2323)) return res.status(403).send({success: false, message: "This code is incorrect! Try again!"});

        const user = await User.findByPk(userId);

        if(!user) return res.status(404).send("This user does not exist");

        user.is_verified = true
        user.save(); 

        const records = await UserRole.create(
        {
            user_id: userId,
            role: UserRole.rawAttributes.role.values[0]
        }) 

        const accessToken = jwt.sign(
        {userId, role: [records.role]}, 
        config.accessTokenSecret,
        {expiresIn: '1h'});

        const refreshToken = jwt.sign(
        {userId},
        config.refreshTokenSecret);

        addTokenToDB(userId, accessToken);
        addTokenToDB(userId, refreshToken);

        res.status(200).send({role: [records.role], accessToken, refreshToken});
    }
    catch (error)
    {
        console.log(err);
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
        const tokens = await UserToken.findAll(conditions);
        
        tokens.forEach((token) => {token.is_invalidated = true; token.save()});

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
    verify,
    logOut,
};

