const {UserToken, UserRole} = require('./models');

async function addTokensToDB(userId, accessToken, refreshToken) 
{
    try
    {
        await UserToken.bulkCreate([
        {
            user_id: userId,
            token: accessToken
        },
        {
            user_id: userId,
            token: refreshToken
        }]);
    }
    catch (err)
    {
        console.log(err);
    }
}

async function getRoles(userId)
{
    try
    {
        const userRoles = await UserRole.findAll(
        {
            where:
            {
                user_id: userId
            },
            attributes: ['role']
        });
    
        const roles = [];
        userRoles.forEach(role => { roles.push(role.role); });

        return roles;
    }
    catch(error) 
    {
        console.log(error);
    }
}

async function findToken(token)
{
    try
    {
        const isTokenFound = await UserToken.findOne(
        {
            where: 
            { 
                token
            }
        });

        return isTokenFound;
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = 
{
    addTokensToDB,
    getRoles,
    findToken
}