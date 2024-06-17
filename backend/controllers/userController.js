const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const registerUser =  asyncHandler(async(req, res) => {
    console.log('Request Body:', req.body); // Check the request body in the console

    const { firstName, middleName, lastName, email, phoneNumber, panCardNumber, aadharCardNumber, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !phoneNumber || !panCardNumber || !aadharCardNumber || !confirmPassword || !email || !password) {
        console.log('Invalid request:', req.body); // Add this line to log invalid request
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    //Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        firstName,
        middleName,
        lastName,
        phoneNumber,
        panCardNumber,
        aadharCardNumber,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            panCardNumber: user.panCardNumber,
            aadharCardNumber: user.aadharCardNumber,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser =  asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials'); 
    }

    
});

const getMe =  asyncHandler(async(req, res) => {
    
    const { _id, name, email } = await User.findById(req.user._id);

    res.status(200).json({
        id: _id,
        name,
        email
    });
});

// Generate and send OTP for password reset
const requestOTP = asyncHandler(async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP and expiry time in the database
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 600000; // 10 minutes
    await user.save();

    // Send OTP to the user's email
    const message = `Your OTP for password reset is ${otp}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Password Reset OTP',
        text: message
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            res.status(500);
            throw new Error('Email could not be sent');
        } else {
            res.status(200).json({ message: 'OTP sent successfully' });
        }
    });
});

// Verify OTP and reset password
const verifyOTP = asyncHandler(async(req, res) => {
    const { email, otp, password, confirmPassword } = req.body;

    const user = await User.findOne({
        email,
        resetPasswordOTP: otp,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
});

// Reset password (if required in a different context)
const resetPassword = asyncHandler(async(req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
});

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = { registerUser, loginUser, getMe , requestOTP, verifyOTP, resetPassword };