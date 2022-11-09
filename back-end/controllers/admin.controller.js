const {Op} = require('sequelize');
const {Sitter, UserRole} = require('../utils/models');
const {ResourceError} = require('../utils/errors');

async function respondToCandidate(req, res) 
{
    const userId = req.params.id;
    const {respond} = req.body;

    const user = await Sitter.findOne(
    {
        where:
        {
            [Op.and]:
            [
                {user_id: userId},
                {
                    status:
                    { 
                        [Op.notIn]: ['Approved']
                    }
                }
            ]
        }
    });

    if(!user) throw new ResourceError('This user does not exist', 400);

    if(respond == 'true')
    {
        user.status = Sitter.rawAttributes.status.values[1];
        user.save();
        await UserRole.create(
        {
            user_id: user.user_id,
            role: UserRole.rawAttributes.role.values[1],
        });
        return res.status(200).send({success: true, message:'User became sitter'});
    }

    user.status = Sitter.rawAttributes.status.values[2];
    user.save();

    return res.status(200).send({success: true, message:"User is disapproved"});
}

module.exports =
{
    respondToCandidate,
};