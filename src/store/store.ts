import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { itemApi } from '../api/itemApiSlice';
import { sessionApi } from '../api/sessionApiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware, sessionApi.middleware),
});

export default store;