import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";
import {
  saveAuthToStorage,
  getAuthFromStorage,
  clearAuthFromStorage,
} from "../utils/localStorage";

interface AuthState extends User {}

const initialState: AuthState = {
  token: null,
  userId: null,
  name: null,
  email: null,
  userType: null,
};

// Initialize state from localStorage
const getInitialState = (): AuthState => {
  const storedAuth = getAuthFromStorage();
  return storedAuth || initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setAuth(state, action: PayloadAction<User>) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userType = action.payload.userType;

      // Save to localStorage
      saveAuthToStorage(action.payload);
    },
    clearAuth(state) {
      state.token = null;
      state.userId = null;
      state.name = null;
      state.email = null;
      state.userType = null;

      // Clear from localStorage
      clearAuthFromStorage();
    },
    initializeAuth(state) {
      const storedAuth = getAuthFromStorage();
      if (storedAuth) {
        state.token = storedAuth.token;
        state.userId = storedAuth.userId;
        state.name = storedAuth.name;
        state.email = storedAuth.email;
        state.userType = storedAuth.userType;
      }
    },
  },
});

export const { setAuth, clearAuth, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
