import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithInterceptor from './baseQuery';
import { UserType } from '../types/User';

interface LoginResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
  userType: UserType;
}

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string; userType: UserType }>({
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
