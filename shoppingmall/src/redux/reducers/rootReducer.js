import { combineReducers } from 'redux';
import authReducer from './authReducer';
import shopReducer from './shopReducer';

const rootReducer = combineReducers({
  auth: authReducer, // Manages authentication state
  shop: shopReducer, // Manages shop-related state
  // Add more reducers here as needed
});

export default rootReducer;
