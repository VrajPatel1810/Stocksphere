import axios from "axios";

const API_URL = '/api/hist/';

// Get all hist
const getAllHist = async (symbol, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + symbol, config);
    return response.data;
};

export default {
    getAllHist,
};