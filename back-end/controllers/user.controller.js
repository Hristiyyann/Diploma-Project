const {User} = require('../utils/models');

async function userInformation(req, res)
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

module.exports = 
{
    userInformation,
}