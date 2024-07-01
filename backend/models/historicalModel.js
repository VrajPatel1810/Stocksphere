const mongoose = require('mongoose');

const historicalDataSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    high: {
        type: Number,
        required: true
    },
    low: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HistoricalData', historicalDataSchema);