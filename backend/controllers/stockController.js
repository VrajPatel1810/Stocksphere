const asyncHandler = require('express-async-handler');

const getStocks = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get stocks' });
})

const setStock = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400);
        throw new Error('Invalid data');
    }

    res.status(200).json({ message: 'Set stock' });
})

const updateStock = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update stock ${req.params.id}` });
})

const deleteStock = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete stock ${req.params.id}` });
})

module.exports = { getStocks, setStock, updateStock, deleteStock };