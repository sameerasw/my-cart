import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { itemApi } from '../api/itemApiSlice';
import { sessionApi } from '../api/sessionApiSlice';
import { cartApi } from '../api/cartApiSlice';
import { ratingApi } from '../api/ratingApiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      itemApi.middleware, 
      sessionApi.middleware,
      cartApi.middleware,
      ratingApi.middleware
    ),
});

export default store;