import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import { itemApi } from '../api/itemApiSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  [itemApi.reducerPath]: itemApi.reducer,
});

export default rootReducer;