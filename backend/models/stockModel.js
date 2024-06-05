const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
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

module.exports = mongoose.model('Stock', stockSchema);