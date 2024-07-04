const asyncHandler = require('express-async-handler');
const Hist = require('../models/historicalModel');
const User = require('../models/userModel');

const getHistoricalData = asyncHandler(async (req, res) => {
    const { symbol } = req.params;
    const hist = await Hist.find({ symbol: symbol });

    if (!hist) {
        res.status(404);
        throw new Error('Historical data not found');
    }

    res.status(200).json(hist);
});

module.exports = {
    getHistoricalData,
};