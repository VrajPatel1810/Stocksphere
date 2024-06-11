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

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = { registerUser, loginUser, getMe };