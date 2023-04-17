import { dayduleApi } from '@/redux/slice';
import { Plan } from '@/redux/types';

export type scheduleReadParams = {
  date: string;
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
    readSchedule: builder.query<scheduleReadResult, scheduleReadParams>({
      query: (scheduleReadParams) => ({
        url: `schedule/read/${scheduleReadParams.date}`,
        method: 'GET',
      }),
      providesTags: ['Schedule'],
    }),
  }),
  overrideExisting: false,
});

export const { useReadScheduleQuery } = scheduleApi;
