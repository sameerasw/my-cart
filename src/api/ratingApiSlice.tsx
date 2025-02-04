import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Rating } from '../types/Rating';

export const ratingApi = createApi({
    reducerPath: 'ratingApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1245' }),
    endpoints: (builder) => ({
        addRating: builder.mutation<Rating, Partial<Rating>>({
            query: (newRating) => ({
                url: '/ratings',
                method: 'POST',
                body: newRating,
            }),
        }),

        getRatingByCustomerAndProduct: builder.query<number, { customerId: number, productId: number }>({
            query: ({ customerId, productId }) => `/ratings/customer/${customerId}/product/${productId}`,
        }),
    }),
});

export const {
    useAddRatingMutation,
    useGetRatingByCustomerAndProductQuery,
} = ratingApi;