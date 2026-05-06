import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import programReducer from '../features/programSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    program: programReducer,
  },
});