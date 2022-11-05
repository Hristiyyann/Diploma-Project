const {validationResult} = require('express-validator');
const {UserToken, UserRole} = require('./models');
const {ValidationError} = require('../utils/errors');

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

function throwError(req)
{
    const error = validationResult(req);
    if(!error.isEmpty()) 
    {
        console.log(JSON.stringify(error.array()));
        throw new ValidationError(error.array()[0].msg, 400);
    }    
}

module.exports = 
{
    addTokensToDB,
    getRoles,
    findToken,
    throwError
}