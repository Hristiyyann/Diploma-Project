class ValidationError extends Error
{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}

class ResourceError extends Error
{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports =
{
    ValidationError,
    ResourceError
}