const asyncHandler = require('express-async-handler');

const Stock = require('../models/stockModel');

const getStocks = asyncHandler(async (req, res) => {

    const stocks = await Stock.find();

    res.status(200).json(stocks);
})

const setStock = asyncHandler(async (req, res) => {

    if (!req.body.name || !req.body.price) {
        res.status(400);
        throw new Error('Invalid data');
    }

    const stock = await Stock.create({
        name: req.body.name,
        price: req.body.price
    });

    res.status(200).json(stock);
})

const updateStock = asyncHandler(async (req, res) => {

    const stock = await Stock.findById(req.params.id);

    if (!stock) {
        res.status(404);
        throw new Error('Stock not found');
    }

    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedStock);
})

const deleteStock = asyncHandler(async (req, res) => {
    
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
        res.status(404);
        throw new Error('Stock not found');
    }

    await stock.deleteOne();

    res.status(200).json({ message: `Stock removed ${req.params.id}` });
})

module.exports = { getStocks, setStock, updateStock, deleteStock };