import { dayduleApi } from '@/redux/slice';

export type User = {
  nickname: string;
  email: string;
  isGuest?: boolean;
};

export type ReadUserResult = {
  isError: boolean;
  user: User;
};

export type UpdateUserResult = {
  isError: boolean;
  user: User;
};

// TODO: nicknameだけを送るように修正（バックエンド修正後）
export type UpdateUserForm = {
  nickname: string;
  email: string;
  password: string;
};

export type UpdatePasswordResult = {
  nickname: string;
  email: string;
};

// TODO: nicknameだけを送るように修正（バックエンド修正後）
export type UpdatePasswordForm = {
  currentPassword: string;
  newPassword: string;
};

const userApi = dayduleApi.injectEndpoints({
  endpoints: (builder) => ({
    readUser: builder.query<ReadUserResult, void>({
      query: () => ({
        url: 'user/read',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    updateUser: builder.mutation<UpdateUserResult, UpdateUserForm>({
      query: (body) => ({
        url: 'user/update',
        method: 'POST',
        body,
      }),
      // FIXME: 再レンダリングされ、タブが切り替わってしまうため、タブが切り替わらないように修正する
      invalidatesTags: ['Auth'],
    }),
    updatePassword: builder.mutation<UpdatePasswordResult, UpdatePasswordForm>({
      query: (body) => ({
        url: 'user/password/update',
        method: 'POST',
        body,
      }),
      // FIXME: 再レンダリングされ、タブが切り替わってしまうため、タブが切り替わらないように修正する
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const { useReadUserQuery, useUpdateUserMutation, useUpdatePasswordMutation } = userApi;
