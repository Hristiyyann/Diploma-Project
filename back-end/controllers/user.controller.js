const {User} = require('../utils/models');

async function getUserInformation(req, res)
{
    const userId = req.userData.userId;

    const data = await User.findOne(
    {
        attributes:
        {
            exclude:['id', 'password', 'createdAt', 'updatedAt', 'is_bloked']
        },

        where: 
        { 
            id: userId
        }
    });

    res.status(200).send({success:true, data})
}

async function putUserInformation(req, res)
{
    const {firstName, lastName, telephone} = req.body
    const userId = req.userData.userId;

    const user = await User.findOne(
    {
        where:
        {
            id: userId
        }
    });

    if(!user) throw new ResourceError('This user does not exist', 400);

    await user.update(
    {
        first_name: firstName,
        last_name: lastName,
        telephone_number: telephone
    });
    
    await user.save();

    return res.status(200).send({success:true});
} 

module.exports = 
{
    getUserInformation,
    putUserInformation
}