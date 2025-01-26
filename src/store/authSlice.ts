import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface AuthState extends User {}

const initialState: AuthState = {
  token: null,
  userId: null,
  name: null,
  email: null,
  userType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<User>) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userType = action.payload.userType;
    },
    clearAuth(state) {
      state.token = null;
      state.userId = null;
      state.name = null;
      state.email = null;
      state.userType = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;