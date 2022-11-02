const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');

router.route('/signup')
    .post(authController.signUp);

router.route('/signin')
    .post(authController.signIn); 

router.route('/verify')
    .post(authController.verify); 
    
router.route('/logout')
    .post(verifyToken, authController.logOut);    

module.exports = router;