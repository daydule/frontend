import { dayduleApi } from '@/redux/slice';

export type ErrorResponse = {
  isError: boolean;
  errorId: string;
  errorMessage: string | string[];
};

export type SignupForm = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

const authApi = dayduleApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<void, SignupForm>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
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
    guestLogin: builder.mutation<void, void>({
      query: () => ({
        url: 'guest/signup',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'Schedule'],
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation, useGuestLoginMutation } = authApi;
