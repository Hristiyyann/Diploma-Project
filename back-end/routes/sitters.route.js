const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const sittersController = require('../controllers/sitters.contoller');

router.route('/candidates')
    .post(verifyToken, sittersController.postCandidates)
    .get(verifyToken, sittersController.getCandidates); 

module.exports = router;