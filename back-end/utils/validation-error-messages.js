const messages = 
{
    userIdNotProvided:'User id is required',
    userIdNotUUID: 'User id must be UUID',

    fnameNotProvided: 'First name is required',
    fnameOnlyLetters: 'First name must contain only letters',

    lnameNotProvided: 'Last name is required',
    lnameOnlyLetters: 'Last name must contain only letters',

    emailNotProvided: 'Email address is required',
    emailNotValid: 'This is not valid email address',

    telephoneNotProvided: 'Telephone number is required',
    telephoneOnlyDigits: 'Telephone number must contains only digits',
    telephoneNotValid: 'This is no valid telephone number',

    passwordNotProvided: 'Password is required',
    passwordContent: 'Your password must be at least 8 characters including one lowercase and uppercase letter, one digit and one symbol',
    confirmPasswordNotProvided: 'Confirmation password is required',
    passwordsNotEqual: 'Password and confirmation passoword are not equal',

    smsCodeNotProvided: 'Verification code is required',
    smsCodeNotValid: 'Verification code must contain only digits',

    tokenNotProvided: 'Token is required',
    tokenNotJWT:'Token is not JWT', 
}

module.exports = messages;