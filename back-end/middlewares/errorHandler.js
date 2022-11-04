function errorHandler(err, req, res, next)
{
    console.error(err.name);
}

module.exports = errorHandler;