const { reset } = require('colors');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    panCardNumber: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordOTP: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);