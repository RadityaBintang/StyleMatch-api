const express = require('express');
const router = express.Router();
const { saveWeight } = require('../controllers/weightController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/', authenticateToken, saveWeight);

module.exports = router;
