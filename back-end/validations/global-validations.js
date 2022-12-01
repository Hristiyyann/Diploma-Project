const { body } = require('express-validator'); 
const messages = require('../utils/validation-error-messages');
const { ValidationError } = require('../utils/errors');

function emailValidation()
{
    return(
        body('emailAddress', messages.emailNotProvided)
        .exists().bail()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage(messages.emailNotValid)
    )
}

function optionalEmailValidation()
{
    return(
        body('emailAddress')
        .if(body('telephoneNumber').not().exists())
        .exists().withMessage(messages.noDataProvided).bail() 
        .trim()
        .normalizeEmail()
        .isEmail().withMessage(messages.emailNotValid)
    )
}

function telephoneValidation()
{
    return (
        body('telephoneNumber', messages.telephoneNotProvided)
        .exists().bail()
        .trim()
        .isMobilePhone(locale = 'any', strictMode = true).withMessage(messages.telephoneNotValid).bail()    
        .isNumeric().withMessage(messages.telephoneOnlyDigits)
    )
}

function optionalTelephoneValidation()
{
    return(
        body('telephoneNumber')
        .if(body('emailAddress').not().exists()) 
        .exists().withMessage(messages.noDataProvided).bail() 
        .trim()
        .isMobilePhone(locale = 'any', strictMode = true).withMessage(messages.telephoneNotValid).bail()    
        .isNumeric().withMessage(messages.telephoneOnlyDigits)
    )
}

function passwordValidation()
{
    return(
        body('password', messages.passwordNotProvided)
        .exists().bail()
        .isStrongPassword(
        {
            minLength:8,
            minLowercase:1,
            minUppercase:1,
            minNumber:1,
            minSymbols:1
        }).withMessage(messages.passwordContent)
    )
}

function confirmPasswordValidation() 
{
    return(
        body('confirmPassword', messages.confirmPasswordNotProvided)
        .exists().bail()
        .custom((value, { req }) => 
        {
            if (value !== req.body.password) throw new ValidationError(messages.passwordsNotEqual);
    
            return true;
        })
    )
}

function codeValidation()
{
    return(
        body('code', messages.smsCodeNotProvided)
        .exists().bail()
        .trim()
        .isNumeric().withMessage(messages.smsCodeNotValid)
    )
}

function refreshTokenVaidation()
{
    return(
        body('refreshToken', messages.tokenNotProvided)
        .exists().bail()
        .trim()
        .isJWT().withMessage(messages.tokenNotJWT)
    )
}

module.exports =  
{
    emailValidation, optionalEmailValidation, telephoneValidation, passwordValidation, 
    optionalTelephoneValidation, confirmPasswordValidation, codeValidation, 
    refreshTokenVaidation
}