const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a stock name']
  },
  price: {
    type: Number,
    required: [true, 'Please add a stock price']
  },
  change: {
    type: Number,
    required: [true, 'Please add a stock change']
  },
  changePercent: {
    type: Number,
    required: [true, 'Please add a stock change percentage']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
