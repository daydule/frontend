import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dayduleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }),
  refetchOnFocus: true,
  tagTypes: ['Auth', 'Schedule'],
  endpoints: (builder) => ({}),
});
