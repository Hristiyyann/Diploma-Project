const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');
const sittersController = require('../controllers/sitters.contoller');

router.route('/candidates')
    .get([verifyToken, verifyRole(['Admin'])], sittersController.getCandidates)
    .post(verifyToken, sittersController.postCandidates);

router.route('/check-candidate')
    .post(verifyToken, sittersController.checkCandidate);

router.route('/self/services')
    .get([verifyToken, verifyRole(['Sitter'])], sittersController.getSelfServices)
    .put([verifyToken, verifyRole(['Sitter'])], sittersController.postSelfServices);

router.route('/self/pets')
    .get([verifyToken, verifyRole(['Sitter'])], sittersController.getSelfPets)
    .put([verifyToken, verifyRole(['Sitter'])], sittersController.postSelfPets);

module.exports = router;