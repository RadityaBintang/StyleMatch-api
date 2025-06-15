const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const { authenticateToken } = require('../middlewares/auth');


router.get('/', authenticateToken, mainController.index);

module.exports = router;
