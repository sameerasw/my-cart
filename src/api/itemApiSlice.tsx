import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithInterceptor from './baseQuery';
import { Product } from '../types/Product';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => '/product/list',
    }),
  }),
});

export const {
  useGetAllProductsQuery,
} = itemApi;