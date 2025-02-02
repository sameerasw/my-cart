import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { CartState } from './CartState';
import { CartItem } from './CartItem';

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart', 
  initialState, 
  reducers: { 
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    }, 

    removeItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    
    clearCart(state) {
      state.cartItems = [];
    },

    updateQuantity(state, action: PayloadAction<{ id: number, quantity: number }>) {
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    proceedToCheckout(state) {
      // not implemented
    }, 

    initializeCart(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
    }
  },
}); 

export const { addToCart, removeItem, clearCart, updateQuantity, proceedToCheckout, initializeCart } = cartSlice.actions; 
export default cartSlice.reducer;