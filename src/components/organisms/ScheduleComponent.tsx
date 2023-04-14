import { formatToYYYY_MM_DD, timeString4digitsDiffMin } from '@/helpers/dateHelper';
import { useReadScheduleQuery } from '@/redux/schedule/slice';
import React from 'react';
import { PlanCardComponent } from '../molecules/PlanCardComponent';
import { CONSTANT } from '@/config/const';

export const ScheduleComponent = () => {
  const dateString = formatToYYYY_MM_DD(new Date());
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  const startTime = scheduleReadResult?.schedule.plans
    .map((plan) => plan.startTime)
    .reduce(
      (currentStartTime: string, startTime: string) =>
        timeString4digitsDiffMin(startTime, currentStartTime) > 0 ? startTime : currentStartTime,
      CONSTANT.DEFAULT.SCHEDULE.START_TIME,
    );

  const endTime = scheduleReadResult?.schedule.plans
    .map((plan) => plan.endTime)
    .reduce(
      (currentEndTime: string, endTime: string) =>
        timeString4digitsDiffMin(endTime, currentEndTime) < 0 ? endTime : currentEndTime,
      CONSTANT.DEFAULT.SCHEDULE.END_TIME,
    );

  if (!startTime || !endTime) return <></>;

  const startHours = parseInt(startTime?.slice(0, 2), 10);
  const endHours = parseInt(endTime?.slice(0, 2), 10);
  const endMinutes = parseInt(endTime?.slice(-2), 10);
  const start = startHours;
  const end = endMinutes > 0 ? endHours + 1 : endHours;
  const range = end - start + 1;

  const minuteHeightPercent = 100 / range / 60;

  return (
    <div className='border border-gray-200 shadow-md rounded-md w-full w-min-fit h-[calc(100%_-_2rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>スケジュール</div>
      <div className='flex h-[calc(100%_-_3rem)] w-full mt-12'>
        <div className='h-full w-1/12 flex justify-center relative'>
          {[...Array(range)].map((_, i) => {
            const hour = i + start <= 12 ? i + start : i + start - 12;
            return (
              <div
                key={'timeAxis' + i}
                className={'absolute mx-auto text-2xl'}
                style={{ top: Math.round(i * minuteHeightPercent * 60 * 100) / 100 + '%' }}
              >
                {hour}:00
              </div>
            );
          })}
        </div>
        <div className='h-full w-11/12 relative'>
          {[...Array(range)].map((_, i) => (
            <div
              key={'timeAxisBorder' + i}
              className={'absolute border-t border-500-gray h-0 w-11/12'}
              style={{ top: 'calc(' + Math.round(i * minuteHeightPercent * 60 * 100) / 100 + '% + 1rem)' }}
            ></div>
          ))}

          {scheduleReadResult?.schedule.plans.map((plan) => (
            <PlanCardComponent key={plan.id} plan={plan} start={start} minuteHeightPercent={minuteHeightPercent} />
          ))}
        </div>
      </div>
    </div>
  );
};
