import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartState } from './CartState';
import { CartItem } from './CartItem';

const initialState: CartState = {
  cartItems: [],
};

// const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
//   const response = await fetch('/api/cart');
//   return response.json(); // Return the cart items
// });

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
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCartItems.pending, (state) => {
  //       // Indicate loading
  //     })
  //     .addCase(fetchCartItems.fulfilled, (state, action) => {
  //       state.cartItems = action.payload;
  //     })
  //     .addCase(fetchCartItems.rejected, (state, action) => {
  //       // Handle the error
  //     });
  // },
});

export const { addToCart, removeItem } = cartSlice.actions; 
// export { fetchCartItems };
export default cartSlice.reducer;