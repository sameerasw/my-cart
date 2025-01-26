import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import { itemApi } from '../api/itemApiSlice';
import { sessionApi } from '../api/sessionApiSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
});

export default rootReducer;