// stockService.js
import axios from 'axios';

const API_URL = '/api/stocks/';

// Buy stock
const buyStock = async (stockData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + 'buy', stockData, config);
    return response.data;
};

// Get stocks
const getStocks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Sell stock
const sellStock = async (stockId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + stockId, config);
    return response.data;
}

export default {
    buyStock,
    getStocks,
    sellStock,
};