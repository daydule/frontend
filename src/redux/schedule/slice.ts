import { dayduleApi } from '@/redux/slice';
import { Plan } from '@/redux/types';

export type scheduleReadParams = {
  date: string;
};

export type scheduleCreateForm = {
  date: string;
  currentTime: string;
};

export type scheduleRecordUpdateForm = {
  date: string;
  startTime: string;
  endTime: string;
};

export type scheduleReadResult = {
  isError: boolean;
  schedule: {
    startTime: string;
    endTime: string;
    plans: Plan[];
  };
  todos: Plan[];
};

const scheduleApi = dayduleApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation<void, scheduleCreateForm>({
      query: (body) => ({
        url: `schedule/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    readSchedule: builder.query<scheduleReadResult, scheduleReadParams>({
      query: (scheduleReadParams) => ({
        url: `schedule/read/${scheduleReadParams.date}`,
        method: 'GET',
      }),
      providesTags: ['Schedule'],
    }),
    updateScheduleRecord: builder.mutation<void, scheduleRecordUpdateForm>({
      query: (body) => ({
        url: `schedule/${body.date}/update`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
  overrideExisting: false,
});

export const { useReadScheduleQuery, useCreateScheduleMutation, useUpdateScheduleRecordMutation } = scheduleApi;
