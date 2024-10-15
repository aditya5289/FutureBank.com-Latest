// src/slices/yourSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const yourSlice = createSlice({
  name: 'yourFeature',
  initialState: {
    // Define the initial state of your feature
  },
  reducers: {
    // Define reducers and automatically generate actions
    yourReducer: (state, action) => {
      // Update state
    },
  },
});

// Export actions
export const { yourReducer } = yourSlice.actions;

// Export reducer
export default yourSlice.reducer;
