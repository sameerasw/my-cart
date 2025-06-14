import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithInterceptor from './baseQuery';
import { CartItem } from '../types/Cart';

interface CartResponse {
  cartItems: CartItem[];
  totalPrice: number;
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getCartItemsByCustomerId: builder.query<CartResponse, number>({
      query: (customerId) => `/cart/${customerId}`,
    }),
    addCartItem: builder.mutation<CartItem, Partial<CartItem>>({
      query: (newCartItem) => ({
        url: '/cart',
        method: 'POST',
        body: newCartItem,
      }),
    }),
    removeCartItem: builder.mutation<void, number>({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: 'DELETE',
      }),
    }),
    clearCart: builder.mutation<void, number>({
      query: (customerId) => ({
        url: `/cart/clear/${customerId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCartItemsByCustomerIdQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;