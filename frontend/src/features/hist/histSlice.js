import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import histService from './histService';

const initialState = {
    hist: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get all hist
export const getHistoricalData = createAsyncThunk('hist/getAllHist', async (symbol, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await histService.getAllHist(symbol, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

export const histSlice = createSlice({
    name: 'hist',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: {
        [getHistoricalData.pending]: (state) => {
            state.isLoading = true;
        },
        [getHistoricalData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.hist = action.payload;
        },
        [getHistoricalData.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        },
    },
});

export const { reset } = histSlice.actions;
export default histSlice.reducer;