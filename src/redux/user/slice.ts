import { dayduleApi } from '@/redux/slice';

export type User = {
  nickname: string;
  email: string;
  isGuest: boolean;
};

export type ReadUserResult = {
  isError: boolean;
  user: User;
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
  }),
  overrideExisting: false,
});

export const { useReadUserQuery } = userApi;
