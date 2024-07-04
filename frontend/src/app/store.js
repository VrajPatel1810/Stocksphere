import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { stockSlice } from '../features/stocks/stockSlice';
import { histSlice } from '../features/hist/histSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    stocks: stockSlice.reducer,
    hist: histSlice.reducer,
  },
});
