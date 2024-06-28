const express = require('express');
const router = express.Router();
const { getStocks, setStock, updateStock, deleteStock, getAllStocks, getStockBySymbol } = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllStocks);
router.get('/:symbol', getStockBySymbol);
router.get('/portfolio', protect, getStocks).post('/', protect, setStock);
router.put('/:id', protect, updateStock).delete('/:id', protect, deleteStock);

module.exports = router;
