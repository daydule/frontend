import { dayduleApi } from '@/redux/slice';

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

export const { useSignupMutation, useLoginMutation, useLogoutMutation } = authApi;
