import axios from 'axios';

const API_URL = '/api/stocks/';

// Get all stocks
const getAllStocks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Buy stock
const buyStock = async (stockData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, stockData, config);
    return response.data;
};

// Get stocks
const getStocks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + 'portfolio', config);
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
    getAllStocks,
};
