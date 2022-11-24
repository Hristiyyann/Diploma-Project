const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');
const messages = require('../utils/validation-error-messages');
const {ValidationError} = require('../utils/errors');
const { throwError } = require('../utils/helpers');

router.route('/signup')
    .post( 
    [
        body('fullName', messages.nameNotProvided)
        .exists().bail()
        .trim(),
        //.isAlpha().withMessage(messages.nameOnlyLetters),

        body('emailAddress', messages.emailNotProvided)
        .exists().bail()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage(messages.emailNotValid),

        body('telephoneNumber', messages.telephoneNotProvided)
        .exists().bail()
        .trim()
        .isNumeric().withMessage(messages.telephoneOnlyDigits).bail()
        .isMobilePhone().withMessage(messages.telephoneNotValid),

        body('password', messages.passwordNotProvided)
        .exists()
        .isStrongPassword(
        {
            minLength:8,
            minLowercase:1,
            minUppercase:1,
            minNumber:1,
            minSymbols:1
        }).withMessage(messages.passwordContent),

        body('confirmPassword', messages.confirmPasswordNotProvided)
        .exists().bail()
        .custom((value, { req }) => 
        {
            if (value !== req.body.password) throw new ValidationError(messages.passwordsNotEqual);
    
            return true;
        }),

    ],authController.signUp);

router.route('/signin')
    .post(
    [
        body('telephoneNumber', messages.telephoneOnlyDigits)
        .optional()
        .trim()
        .isNumeric().bail()
        .isMobilePhone().withMessage(messages.telephoneNotValid),

        body('emailAddress', messages.emailNotValid) 
        .optional()
        .trim()
        .normalizeEmail()
        .isEmail(),
        
        body('password', messages.passwordNotProvided).exists()
    ],authController.signIn); 

router.route('/verify')
    .post(
    [
        body('smsCode', messages.smsCodeNotProvided)
        .exists().bail()
        .trim()
        .isNumeric().withMessage(messages.smsCodeNotValid),

        body('userId', messages.userIdNotProvided)
        .exists().bail()
        .trim()
        .isUUID().withMessage(messages.userIdNotUUID)
    ],authController.verify); 
    
router.route('/refresh')    
    .post(
    [
        body('refreshToken', messages.tokenNotProvided)
        .exists().bail()
        .trim()
        .isJWT().withMessage(messages.tokenNotJWT)
    ],authController.refreshToken);

router.route('/logout')
    .post(
    [
        verifyToken,
        body('refreshToken', messages.tokenNotProvided)
        .exists().bail()
        .trim()
        .isJWT().withMessage(messages.tokenNotJWT)
    ],authController.logOut);
    
module.exports = router;