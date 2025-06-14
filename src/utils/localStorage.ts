import { User } from "../types/User";

const AUTH_STORAGE_KEY = "my-cart-auth";

export const saveAuthToStorage = (authData: User) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  } catch (error) {
    console.error("Failed to save auth data to localStorage:", error);
  }
};

export const getAuthFromStorage = (): User | null => {
  try {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : null;
  } catch (error) {
    console.error("Failed to retrieve auth data from localStorage:", error);
    return null;
  }
};

export const clearAuthFromStorage = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear auth data from localStorage:", error);
  }
};
