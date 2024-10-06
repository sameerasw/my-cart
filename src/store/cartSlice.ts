//  cartSlice.ts 
import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { CartState} from './CartState';
import { CartItem } from './CartItem';

const initialState: CartState = {
  cartItems: [],
};

// cart actions. We are not using a backend so there is no call to cart API endpoint
const cartSlice = createSlice({
  name: 'cart', 
  initialState, 
  reducers: { 
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
    }, 

    removeItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    
    clearCart(state) {
        // Clear cart by assigning an empty array
        state.cartItems = [];
    },
    // add your 'proceedToCheckout'  action here 
    proceedToCheckout(state) {
      // this function updates the 'cartItems' or even moves them into the 'checkout' array  
      // to get data into an Order in the future - not required as of now as we are 
      // working on a dummy implementation with local data
      // (Optional: for future implementation) 
      //  if there is an actual checkout (or order creation) involved, update state
    }, 
  },
}); 

export const { addToCart, removeItem, clearCart, proceedToCheckout } = cartSlice.actions; 
export default cartSlice.reducer; 