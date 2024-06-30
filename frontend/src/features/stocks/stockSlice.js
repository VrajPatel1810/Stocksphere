import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stockService from './stockService';

const initialState = {
    stocks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get all stocks
export const getAllStocks = createAsyncThunk('stocks/getAllStocks', async (_, thunkAPI) => {
    try {
        return await stockService.getAllStocks();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

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
export const getStocks = createAsyncThunk('stocks/getStock', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await stockService.getStocks(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

// Get stocks by symbol
export const getStocksBySymbol = createAsyncThunk('stocks/getStocksBySymbol', async (symbol, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await stockService.getStocksBySymbol(symbol, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

// Sell stocks
export const sellStock = createAsyncThunk('stocks/sellStock', async (stockId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await stockService.sellStock(stockId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

export const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(buyStock.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(buyStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks.push(action.payload);
            })
            .addCase(buyStock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(getStocks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStocks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks = action.payload;
            })
            .addCase(getStocks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(sellStock.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sellStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks = state.stocks.filter(stock => stock._id !== action.payload._id);
            })
            .addCase(sellStock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(getAllStocks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllStocks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks = action.payload;
            })
            .addCase(getAllStocks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(getStocksBySymbol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStocksBySymbol.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stocks = action.payload;
            })
            .addCase(getStocksBySymbol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });

    },
});

export const { reset } = stockSlice.actions;
export default stockSlice.reducer;
