const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
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