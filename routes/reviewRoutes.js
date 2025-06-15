const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.get('/:outfitId', reviewController.getReviewsByOutfitId);
router.post('/', reviewController.addReview);

module.exports = router;
