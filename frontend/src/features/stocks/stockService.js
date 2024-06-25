import axios from 'axios';

const API_URL = '/api/stocks/';

// Buy stock
const buyStock = async (stockData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${API_URL}buy`, stockData, config);
    return response.data;
};

// Get stocks
const getStocks = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, goalData, config);
    return response.data;
}

const stockService = {
    buyStock,
    getStocks,
};
