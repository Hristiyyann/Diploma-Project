const {ValidationError} = require('../utils/errors');

function verifyRole(roles)
{
    return(req, res, next) =>
    {
        const userRoles = req.userData.roles;
        
        for(const role of userRoles)
        {
            if(roles.includes(role))
            {
                console.log(roles, role);
                return next();
            }
        }
    
        throw new ValidationError("Unauthorized", 403);
    }
}

module.exports = verifyRole;