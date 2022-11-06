const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const {UserToken, User} = require('../utils/models');
const {findToken} = require('../utils/helpers');
const {ValidationError, ResourceError} = require('../utils/errors');

async function verifyToken(req, res, next) 
{
    const {accessToken} = req.body;

    if(!accessToken) throw new ResourceError('Token needed', 403);

    const isTokenFound = await findToken(accessToken);
    if(!isTokenFound) throw new ResourceError('Provided token is invalid', 403);
    
    const user = jwt.verify(accessToken, config.accessTokenSecret);
    req.userData = user;
    
    next();
}

module.exports = verifyToken;