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
    const stocks = await allStock.find({ symbol: symbol });

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

const buyStock = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.symbol || !req.body.price || !req.body.quantity) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const stockName = req.body.name;
    const stockSymbol = req.body.symbol;
    const stockPrice = req.body.price;
    const stockQuantity = req.body.quantity;

    let existingStock = await Stock.findOne({ symbol: stockSymbol, user: req.user.id });

    if (existingStock) {
        // Stock exists, update its quantity
        existingStock.quantity += stockQuantity;
        await existingStock.save();
    } else {
        // Stock does not exist, create a new stock entry
        existingStock = new Stock({
            name: stockName,
            symbol: stockSymbol,
            price: stockPrice,
            quantity: stockQuantity,
            user: req.user.id,
        });
        await existingStock.save();
    }

    res.status(200).json(existingStock);
});

const sellStock = asyncHandler(async (req, res) => {
    const { stockId, quantity } = req.body;
    
    if (!stockId || !quantity) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const existingStock = await Stock.findOne({ _id: stockId });

    if (!existingStock) {
        return res.status(400).json({ message: 'Stock not found' });
    }

    if (existingStock.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock to sell' });
    }

    existingStock.quantity -= quantity;

    if (existingStock.quantity === 0) {
        await Stock.findByIdAndDelete(existingStock._id);
        return res.status(200).json({ message: 'Stock sold out' });
    }

    await existingStock.save();

    res.status(200).json(existingStock);
});

module.exports = { getStocks, buyStock, sellStock, getAllStocks, getStockBySymbol };
