import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stockService from './stockService';

const initialState = {
    stocks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Buy stocks
export const buyStock = createAsyncThunk('stocks/buyStock', async (stockData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await stockService.buyStock(stockData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }           
});

// Get stocks
export const getStocks = createAsyncThunk('stocks/getStocks', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await stockService.getStocks(goalData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }           
});

export const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        reset: (state) => initialState,

    },
    extraReducers: {
        [buyStock.pending]: (state) => {
            state.isLoading = true;
        },
        [buyStock.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.stocks = action.payload;
        },
        [buyStock.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        },
        [getStocks.pending]: (state) => {
            state.isLoading = true;
        },
        [getStocks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.stocks = action.payload;
        },
        [getStocks.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        },
    },
});