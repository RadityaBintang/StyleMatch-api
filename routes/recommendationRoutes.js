const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/', recommendationController.getRecommendations);
router.get('/all', recommendationController.index);
router.get('/:id', recommendationController.getDetail);

module.exports = router;
