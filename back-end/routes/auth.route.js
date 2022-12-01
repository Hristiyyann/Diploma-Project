const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validators = require('../validations/validators');
const verifyToken = require('../middlewares/verifyToken');

router.route('/sign-up')
    .post(validators.signUp, authController.signUp);

router.route('/sign-in')
    .post(validators.signIn, authController.signIn); 

router.route('/verify')
    .post(validators.verify, authController.verify);
    
router.route('/resend')
    .post(authController.resend);
    
router.route('/refresh')    
    .post(validators.refresh, authController.refreshToken);

router.route('/change-password')
    .put(verifyToken, validators.changePassword,  authController.changePassword);

router.route('/forget-password')
    .post(validators.forgetPassword, authController.forgetPassword);

router.route('/password-recovery')
    .post(validators.passwordRecovery, authController.passwordRecovery);

 router.route('/check-code')
    .post(validators.checkCode, authController.checkCode);

router.route('/log-out')
    .post(verifyToken, validators.logOut, authController.logOut);
    
module.exports = router;