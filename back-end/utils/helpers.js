const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {UserToken, UserRole} = require('./models');
const {ValidationError} = require('../utils/errors');
const config = require('../utils/config');

async function addTokensToDB(userId, accessToken, refreshToken) 
{
    await UserToken.bulkCreate([
    {
        user_id: userId,
        token: accessToken, 
        token_type: UserToken.rawAttributes.token_type.values[0]
    },
    {
        user_id: userId,
        token: refreshToken,
        token_type:UserToken.rawAttributes.token_type.values[1]
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

function signAccessToken(userId, roles)
{
    const accessToken = jwt.sign(
    {userId, roles}, 
    config.accessTokenSecret,
    {expiresIn: '1h'});

    return accessToken;
}

function signRefreshToken(userId)
{
    const refreshToken = jwt.sign(
    {userId},
    config.refreshTokenSecret);
    
    return refreshToken;
}

function differenceInDays(changeDate)
{
    const previousStatusChange = new Date(changeDate);
    const todayDate = new Date();
    const millisPerDay = 24 * 60 * 60 * 1000; 

    return Math.floor((todayDate - previousStatusChange) / millisPerDay);
}

module.exports = 
{
    addTokensToDB,
    getRoles,
    findToken,
    throwError,
    signAccessToken,
    signRefreshToken,
    differenceInDays
}