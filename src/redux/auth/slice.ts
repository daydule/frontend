import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginForm {
  userName: string;
  password: string;
}

interface UserState {
  userName: string | undefined;
  token: string | undefined;
}

export interface AuthState {
  user: UserState | undefined;
}

const initialState: AuthState = {
  user: undefined,
};

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<UserState, LoginForm>({
      query: (body) => ({
        url: 'mockLogin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    });
  },
});
