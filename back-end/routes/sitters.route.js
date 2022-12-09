const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');
const sittersController = require('../controllers/sitters.contoller');

router.route('/candidates')
    .post(verifyToken, sittersController.postCandidates)
    .get([verifyToken, verifyRole(['Admin'])], sittersController.getCandidates); 

router.route('/check-candidate')
    .post(verifyToken, sittersController.checkCandidate);

router.route('/self/services')
    .post([verifyToken, verifyRole(['Sitter'])], sittersController.getSelfServices)
    .put([verifyToken, verifyRole(['Sitter'])], sittersController.postSelfServices);

router.route('/self/pets')
    .post([verifyToken, verifyRole(['Sitter'])], sittersController.getSelfPets)
    .put([verifyToken, verifyRole(['Sitter'])], sittersController.postSelfPets);

module.exports = router;