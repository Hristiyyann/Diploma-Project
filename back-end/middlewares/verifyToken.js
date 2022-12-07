const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { ResourceError } = require('../utils/errors');

async function verifyToken(req, res, next) 
{
    const {accessToken} = req.body;

    if(!accessToken) throw new ResourceError('Token needed', 403);
    
    const user = jwt.verify(accessToken, config.accessTokenSecret);
    req.userData = user;
    
    next();
}

module.exports = verifyToken;