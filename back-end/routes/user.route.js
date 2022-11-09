const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.route('/information')
    .get(verifyToken, userController.userInformation);

module.exports = router;