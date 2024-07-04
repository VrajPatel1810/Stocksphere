const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getHistoricalData } = require('../controllers/histController');

router.get('/:symbol', protect, getHistoricalData);

module.exports = router;
