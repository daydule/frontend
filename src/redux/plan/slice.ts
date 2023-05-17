import { dayduleApi } from '@/redux/slice';

export type CreateForm = {
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  context?: string;
  place?: string;
  travelTime?: number;
  bufferTime?: number;
  processTime?: number;
  priority: number;
  planType: number;
  isRequiredPlan?: boolean;
};

export type UpdateForm = {
  id: number;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  processTime?: number;
  priority: number;
  planType: number;
};

export type DeleteForm = {
  id: number;
};

export type UpdateTodoPriorityForm = {
  ids: number[];
};

export type BackToListForm = {
  date: string;
};

const planApi = dayduleApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlan: builder.mutation<void, CreateForm>({
      query: (body) => ({
        url: 'plan/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    updatePlan: builder.mutation<void, UpdateForm>({
      query: (body) => ({
        url: `'plan/${body.id}/update`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    deletePlan: builder.mutation<void, DeleteForm>({
      query: (body) => ({
        url: `plan/${body.id}/delete`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    updateTodoPriority: builder.mutation<void, UpdateTodoPriorityForm>({
      query: (body) => ({
        url: `plan/updateTodoPriority`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    backToList: builder.mutation<void, BackToListForm>({
      query: (body) => ({
        url: `plan/backToList`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useUpdateTodoPriorityMutation,
  useBackToListMutation,
} = planApi;
