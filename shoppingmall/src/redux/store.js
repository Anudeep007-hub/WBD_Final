import { configureStore } from '@reduxjs/toolkit';
import dealsReducer from './reducers/dealsReducer';
import shopsReducer from './reducers/shopReducer'; // Assuming you have this from earlier.

const store = configureStore({
  reducer: {
    deals: dealsReducer,
    shops: shopsReducer, // Add other reducers here.
  },
});

export default store;
