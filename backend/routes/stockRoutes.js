const express = require('express');
const router = express.Router();
const { getStocks, setStock, updateStock, deleteStock, getAllStocks, getStockBySymbol } = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.get('/portfolio', protect, getStocks);
router.post('/', protect, setStock);
router.get('/', getAllStocks);
router.get('/:symbol', getStockBySymbol);
router.put('/:id', protect, updateStock);
router.delete('/:id', protect, deleteStock);

module.exports = router;
