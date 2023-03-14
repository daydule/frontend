import { dayduleApi } from '@/redux/slice';
import { Plan } from '../plan/type';

export type scheduleReadParams = {
  date: string;
};

export type scheduleReadResult = {
  isError: boolean;
  schedule: {
    isScheduled: boolean;
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
