const {ValidationError} = require('../utils/errors');

function verifyRole(roles)
{
    return(req, res, next) =>
    {
        const userRoles = req.userData.roles;
        userRoles.forEach(role => 
        {
            if(roles.includes(role))
            {
                next();
            }
        })

        throw new ValidationError("Unauthorized", 403);
    }
}

module.exports = verifyRole;