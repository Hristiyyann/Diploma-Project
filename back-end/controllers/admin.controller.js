const { Op } = require('sequelize');
const { Sitter, UserRole } = require('../utils/models');
const { ResourceError } = require('../utils/errors');
const messages = require('../utils/thrown-error-messages');

async function respondToCandidate(req, res) 
{
    const userId = req.params.id;
    const { respond } = req.body;

    const user = await Sitter.findOne(
    {
        where:
        {
            [Op.and]:
            [
                {userId},
                {
                    status:
                    { 
                        [Op.notIn]: ['Approved']
                    }
                }
            ]
        }
    });

    if(!user) throw new ResourceError(messages.userNotExists, 400);

    if(respond == 'true')
    {
        user.status = Sitter.rawAttributes.status.values[1];
        user.save();
        await UserRole.create(
        {
            userId: user.userId,
            role: UserRole.rawAttributes.role.values[1],
        });
        return res.status(200).send({ success: true, message: messages.approvedUser });
    }

    user.status = Sitter.rawAttributes.status.values[2];
    user.save();

    return res.status(200).send({ success: true, message: messages.disapprovedUser });
}

module.exports =
{
    respondToCandidate,
};