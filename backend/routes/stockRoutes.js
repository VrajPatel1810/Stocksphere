const express = require('express');
const router = express.Router();
const { getStocks, setStock, updateStock, deleteStock } = require('../controllers/stockController');

router.get('/', getStocks).post('/', setStock);
router.put('/:id', updateStock).delete('/:id', deleteStock);

module.exports = router;