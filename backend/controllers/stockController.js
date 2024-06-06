const asyncHandler = require('express-async-handler');

const Stock = require('../models/stockModel');
const User = require('../models/userModel');

const getStocks = asyncHandler(async (req, res) => {

    const stocks = await Stock.find( { user: req.user.id } );

    res.status(200).json(stocks);
})

const setStock = asyncHandler(async (req, res) => {

    if (!req.body.name || !req.body.price) {
        res.status(400);
        throw new Error('Invalid data');
    }

    const stock = await Stock.create({
        name: req.body.name,
        price: req.body.price,
        user: req.user.id,
    });

    res.status(200).json(stock);
})

const updateStock = asyncHandler(async (req, res) => {

    const stock = await Stock.findById(req.params.id);

    if (!stock) {
        res.status(404);
        throw new Error('Stock not found');
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Make sure the logged in user is the owner of the stock
    if (stock.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
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

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Make sure the logged in user is the owner of the stock
    if (stock.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await stock.deleteOne();

    res.status(200).json({ message: `Stock removed ${req.params.id}` });
})

module.exports = { getStocks, setStock, updateStock, deleteStock };