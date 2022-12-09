const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { UserToken, UserRole } = require('./models');
const { ValidationError } = require('../utils/errors');
const config = require('../utils/config');

async function addTokenToDB(userId, refreshToken) 
{
    await UserToken.create
    ({
        userId,
        token: refreshToken
    });
}

async function getRoles(userId)
{
    const userRoles = await UserRole.findAll(
    {
        where:
        {
            userId
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

function signAccessToken(data)
{
    let payload = {};
    if(data?.sitterId) payload = {userId: data.userId, sitterId: data.sitterId, roles: data.roles};
    else payload = {userId: data.userId, roles: data.roles};

    const accessToken = jwt.sign
    (
        payload,
        config.accessTokenSecret,
        {expiresIn: '10m'}
    );  

    return accessToken;
}

function signRefreshToken(data)
{
    let payload = {};
    if(data?.sitterId) payload = {userId: data.userId, sitterId: data.sitterId};
    else payload = {userId: data.userId};

    const refreshToken = jwt.sign
    (
        payload,
        config.refreshTokenSecret
    );
    
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
    addTokenToDB, getRoles, findToken, throwError, signAccessToken, 
    signRefreshToken, differenceInDays
}