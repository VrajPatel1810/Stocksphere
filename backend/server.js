const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/hist', require('./routes/histRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.green);
});
