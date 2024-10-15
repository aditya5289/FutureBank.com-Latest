// src/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import your slice reducers
// import yourSlice from './slices/yourSlice';

export const store = configureStore({
  reducer: {
    // Register your state slices here
    // yourSlice: yourSlice.reducer,
  },
  // Middleware and DevTools are automatically configured by Redux Toolkit
});
