import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import { itemApi } from '../api/itemApiSlice';
import { sessionApi } from '../api/sessionApiSlice';
import { cartApi } from '../api/cartApiSlice';
import { ratingApi } from '../api/ratingApiSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [ratingApi.reducerPath]: ratingApi.reducer,
});

export default rootReducer;