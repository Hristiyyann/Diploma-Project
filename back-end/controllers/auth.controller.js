const User = require('../models/users.model');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');

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

module.exports = {
    signUp,
};

