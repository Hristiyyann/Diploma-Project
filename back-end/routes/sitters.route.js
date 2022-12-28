const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');
const sittersController = require('../controllers/sitters.contoller');

router.route('/candidates')
    .get([verifyToken, verifyRole(['Admin'])], sittersController.getCandidates)
    .post(verifyToken, sittersController.postCandidates);

router.route('/check-candidate')
    .get(verifyToken, sittersController.checkCandidate);

router.route('/self/services')
    .get([verifyToken, verifyRole(['Sitter'])], sittersController.getSitterServices)
    .put([verifyToken, verifyRole(['Sitter'])], sittersController.putSitterServices);

router.route('/self/pets')
    .get([verifyToken, verifyRole(['Sitter'])], sittersController.getSitterPets)
    .put([verifyToken, verifyRole(['Sitter'])], sittersController.putSitterPets);

router.route('/services/time-ranges')
    .get(sittersController.getServiceTimeRanges);

module.exports = router;