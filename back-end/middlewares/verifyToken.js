const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const {findToken} = require('../utils/helpers');

async function verifyToken(req, res, next) 
{
    const {accessToken} = req.body;

    if(!accessToken) return res.status(403).send({success: false, message: "Token needed!"});

    try
    {
        const isTokenFound = await findToken(accessToken);
        if(!isTokenFound) return res.status(403).send({success: false, message: "Provided token is invalid!"});

        const user = jwt.verify(accessToken, config.accessTokenSecret);
        req.userData = user;
    }
    catch(error)
    {
        return res.status(403).send({success: false, message: "Provided token is invalid!"});
    }
    
    next();
}

module.exports = verifyToken;