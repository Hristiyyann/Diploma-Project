function errorLogger(err, req, res, next) 
{
    console.error(err.name);
    next(err);
}

module.exports = errorLogger;