function errorLogger(err, req, res, next) 
{
    console.error(err);
    next(err);
}

module.exports = errorLogger;