const { User } = require('../utils/models');
const messages = require('../utils/thrown-error-messages');

async function getUserInformation(req, res)
{
    const userId = req.userData.userId;

    const data = await User.findOne(
    {
        attributes:
        {
            exclude:['id', 'password', 'createdAt', 'updatedAt', 'isBloked']
        },

        where: 
        { 
            id: userId
        }
    });

    res.status(200).send({ success:true, data })
}

async function putUserInformation(req, res)
{
    const { firstName, lastName, telephoneNumber } = req.body
    const userId = req.userData.userId;

    const user = await User.findOne(
    {
        where:
        {
            id: userId
        }
    });

    if(!user) throw new ResourceError(messages.userNotExists, 400);

    await user.update(
    {
        firstName,
        lastName,
        telephoneNumber
    });
    
    await user.save();

    return res.status(200).send({ success:true });
} 

module.exports = 
{
    getUserInformation,
    putUserInformation
}