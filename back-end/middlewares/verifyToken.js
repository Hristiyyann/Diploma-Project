const jwt = require('jsonwebtoken');
const { ResourceError } = require('../utils/errors');

async function verifyToken(req, res, next) 
{
    const accessToken = req.headers.authorization.split(' ')[1];
   
    if(!accessToken) throw new ResourceError('Token needed', 403);
    
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userData = user;
    
    next();
}

module.exports = verifyToken;