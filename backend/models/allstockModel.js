const mongoose = require('mongoose');

const allstockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    odchange : {
        type: Number,
        default: 0,
        required: true
    },
    ftwhigh: {
        type: Number,
        required: true
    },
    ftwlow: {
        type: Number,
        required: true
    },
    oychange: {
        type: Number,
        required: true
    },
    fychange: {
        type: Number,
        required: true
    },
    marcap: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    avgvolume: {
        type: Number,
        required: true
    },
    divyield: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('allStock', allstockSchema);