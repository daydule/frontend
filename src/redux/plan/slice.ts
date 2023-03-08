import { dayduleApi } from '@/redux/slice';

export type CreateForm = {
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  processTime?: number;
  priority: number;
  planType: number;
};

const planApi = dayduleApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlan: builder.mutation<void, CreateForm>({
      query: (body) => ({
        url: 'plan/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePlanMutation } = planApi;
