const mongoose = require('mongoose');

const allstockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        required: true
    },
    changePercent: {
        type: Number,
        required: true
    },
},
    //,
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // } 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('allStock', allstockSchema);