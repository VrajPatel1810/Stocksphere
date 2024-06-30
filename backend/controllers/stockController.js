const asyncHandler = require('express-async-handler');
const Stock = require('../models/stockModel');
const User = require('../models/userModel');
const allStock = require('../models/allstockModel');

const getAllStocks = asyncHandler(async (req, res) => {
    const allstocks = await allStock.find();
    res.status(200).json(allstocks);
});

const getStockBySymbol = asyncHandler(async (req, res) => {
    const { symbol } = req.params;
    const stocks = await allStock.find({ name: symbol });

    if (!stocks) {
        res.status(404);
        throw new Error('Stock not found');
    }

    res.status(200).json(stocks);
});

const getStocks = asyncHandler(async (req, res) => {

    const userId = req.user.id;
    const stocks = await Stock.find({ user: userId });

    if (stocks && stocks.length > 0) {
        res.status(200).json(stocks);
    } else {
        res.status(404);
        throw new Error('Stock not found');
    }
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