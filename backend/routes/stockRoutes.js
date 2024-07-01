const express = require('express');
const router = express.Router();
const { getStocks, buyStock, sellStock, getAllStocks, getStockBySymbol } = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.get('/portfolio', protect, getStocks);
router.post('/', protect, buyStock);
router.post('/:id', protect, sellStock);
router.get('/', getAllStocks);
router.get('/:symbol', getStockBySymbol);

module.exports = router;
