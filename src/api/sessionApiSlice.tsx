import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { UserType } from '../types/User';

const API_URL = config.API_BASE_URL;

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string, userId: number, name: string, email: string, userType: UserType }, { email: string; password: string; userType: UserType }>({
      query: ({ email, password, userType }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: { email, password, userType },
      }),
    }),
    register: builder.mutation<any, { name: string; email: string; password: string; userType: UserType }>({
      query: ({ name, email, password, userType }) => ({
        url: `/customers`,
        method: 'POST',
        body: { name, email, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = sessionApi;
