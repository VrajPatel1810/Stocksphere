import axios from 'axios';

const API_URL = '/api/users/';

// Register a new user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData); 

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Login
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData); 

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout
const logout = async () => {
    localStorage.removeItem('user');
};

// Request OTP for password reset
const requestOtp = async (userData) => {
    const response = await axios.post(API_URL + 'requestotp', userData);
    return response.data;
};

// Verify OTP
const verifyOtp = async (userData) => {
    const response = await axios.post(API_URL + 'verifyotp', userData);
    return response.data;
};

// Reset Password
const resetPassword = async (userData) => {
    const response = await axios.post(API_URL + 'resetpassword', userData);
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    requestOtp,
    verifyOtp,
    resetPassword
};

export default authService;
