const {validationResult} = require('express-validator');
const {UserToken, UserRole} = require('./models');
const {ValidationError} = require('../utils/errors');

async function addTokensToDB(userId, accessToken, refreshToken) 
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

async function getRoles(userId)
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

async function findToken(token)
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