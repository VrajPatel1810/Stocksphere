const asyncHandler = require('express-async-handler');
const Stock = require('../models/stockModel');
const User = require('../models/userModel');

const getAllStocks = asyncHandler(async (req, res) => {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
});

const getStockBySymbol = asyncHandler(async (req, res) => {
    const { symbol } = req.params;
    const stock = await Stock.findOne({ symbol });
  
    if (!stock) {
      res.status(404);
      throw new Error('Stock not found');
    }
  
    res.status(200).json(stock);
  });

const getStocks = asyncHandler(async (req, res) => {
    const stocks = await Stock.find({ user: req.user.id });
    res.status(200).json(stocks);
});

const setStock = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const stock = await Stock.create({
        name: req.body.name,
        price: req.body.price,
        user: req.user.id,
    });

    res.status(200).json(stock);
});

const updateStock = asyncHandler(async (req, res) => {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    if (stock.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedStock);
});

const deleteStock = asyncHandler(async (req, res) => {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    if (stock.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await stock.deleteOne();

    res.status(200).json({ message: `Stock removed ${req.params.id}` });
});

module.exports = { getStocks, setStock, updateStock, deleteStock, getAllStocks, getStockBySymbol };