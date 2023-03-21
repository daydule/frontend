import { dayduleApi } from '@/redux/slice';

export type GuestCheckResult = {
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

const authApi = dayduleApi.injectEndpoints({
  endpoints: (builder) => ({
    guestCheck: builder.query<GuestCheckResult, void>({
      query: () => ({
        url: 'guestCheck',
        method: 'GET',
      }),
      providesTags: ['Auth'],
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
      }),
      invalidatesTags: ['Auth', 'Schedule'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'Schedule'],
    }),
  }),
  overrideExisting: false,
});

export const { useGuestCheckQuery, useLazyGuestCheckQuery, useSignupMutation, useLoginMutation, useLogoutMutation } =
  authApi;
