import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type } from 'os';

export type guestCheckState = {
  isError: false;
  isLogin: false;
  isGuest: false;
};

export type SignupForm = {
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type AuthState = {
  guestCheck: guestCheckState | undefined;
};

const initialState: AuthState = {
  guestCheck: {
    isError: false,
    isLogin: false,
    isGuest: false,
  },
};

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    guestCheck: builder.query<guestCheckState, void>({
      query: () => ({
        url: 'guestCheck',
        method: 'GET',
      }),
    }),
    signup: builder.mutation<void, SignupForm>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<void, LoginForm>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
        mode: 'no-cors',
      }),
    }),
  }),
});

export const { useGuestCheckQuery, useSignupMutation, useLoginMutation } = authApi;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.guestCheck.matchFulfilled, (state, action: PayloadAction<guestCheckState>) => {
      state.guestCheck = action.payload;
    });
  },
});
