import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { itemApi } from '../api/itemApiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});

export default store;