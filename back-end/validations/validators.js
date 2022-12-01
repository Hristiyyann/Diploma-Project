const { body } = require('express-validator');
const messages = require('../utils/validation-error-messages');
const validations = require('./global-validations');

const signUp = 
[
    validations.emailValidation(),
    validations.telephoneValidation(),
    validations.passwordValidation(),
    validations.confirmPasswordValidation(),
];

const signIn = 
[
    validations.emailValidation(),
    body('password', messages.passwordNotProvided).exists()
]

const verify = 
[
    validations.codeValidation(),
    body('userId', messages.userIdNotProvided)
    .exists().bail()
    .trim()
    .isUUID().withMessage(messages.userIdNotUUID)
]

const refresh = 
[
    validations.refreshTokenVaidation()
]

const logOut = 
[
    validations.refreshTokenVaidation()
]

module.exports = 
{ 
    signUp, signIn, verify, refresh, logOut,
};