const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');
const adminController = require('../controllers/admin.controller');

router.route('/candidate/:id')
    .post([verifyToken, verifyRole(['Admin'])], adminController.respondToCandidate);

module.exports = router;