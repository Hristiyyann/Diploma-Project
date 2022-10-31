const {User, UserRole} = require('../utils/models');
const {addTokenToDB} = require('../utils/helpers');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');

async function signUp(req, res) 
{
    try
    {
        const {firstName, lastName, emailAddress, password, telephoneNumber} = req.body;

        const oldUser = await User.findOne(
        {
            where: 
            {
                [Op.or]:
                [
                    {telephone_number: telephoneNumber},
                    {email_address: emailAddress}
                ]
            }
        });

        if(oldUser) res.status(400).send({success: false, message: "This user already exists, please log in!"});

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
    catch(err) 
    {
        console.log(err);
    }
}

async function verify(req, res)
{
    try 
    {
        const{smsCode, userId} = req.body;
        //смс кода се проверява

        const user = await User.findByPk(userId);

        if(!user) res.status(404).send("This user does not exist");

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
        {expiresIn: '30s'});

        const refreshToken = jwt.sign(
        {userId},
        config.refreshTokenSecret);

        addTokenToDB(userId, accessToken);
        addTokenToDB(userId, refreshToken);

        res.status(200).send({role: [records.role], accessToken, refreshToken});
    }
    catch (err)
    {
        console.log(err);
    }
}

module.exports = 
{
    signUp,
    verify
};

