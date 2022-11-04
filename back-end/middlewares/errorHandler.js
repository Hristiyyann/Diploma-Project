const {ValidationError, ResourceError} = require('../utils/errors');

function errorHandler(err, req, res, next)
{
    if(err.name == 'SequelizeUniqueConstraintError') res.status(403).send({success: false, message: "This email is already used"});
    else if(err.name == 'TokenExpiredError') return res.status(403).send({success: false, message: "Provided token is invalid!"});
    else if(err.name == 'JsonWebTokenError') return res.status(403).send({success: false, message: "Access denied"});
    else if(err instanceof ValidationError) return res.status(err.statusCode).send({success: false, message: err.message});
    else if(err instanceof ResourceError) return res.status(err.statusCode).send({success: false, message: err.message});
    else return res.status(500).send({success: false, message: err.message});
}

module.exports = errorHandler;