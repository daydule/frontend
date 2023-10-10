import React, { useEffect, useState } from 'react';
import { BackToListButtonComponent } from './BackToListButtonComponent';
import { PlanCardComponent } from './PlanCardComponent';
import { CONSTANT } from '@/constant/default';
import { formatToYYYY_MM_DD, timeString4digitsDiffMin } from '@/helpers/dateHelper';
import { useReadScheduleQuery } from '@/redux/schedule/slice';

export const ScheduleComponent = () => {
  const [now, setNow] = useState<Date>(new Date());
  const dateString = formatToYYYY_MM_DD(now);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });

  // NOTE: 現在時刻バー表示更新のために、1分ごとに現在時刻を更新する
  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(timerId);
  }, [now]);

  if (!scheduleReadResult) return <></>;

  // NOTE: スケジュールの開始、終了時間外の予定がある場合は、表示を拡大する
  const startTime = scheduleReadResult.schedule.plans

    .map((plan) => plan.startTime)
    .reduce(
      (currentStartTime: string, startTime: string) =>
        timeString4digitsDiffMin(startTime, currentStartTime) > 0 ? startTime : currentStartTime,
      scheduleReadResult.schedule.startTime,
    );
  const endTime = scheduleReadResult.schedule.plans
    .map((plan) => plan.endTime)
    .reduce(
      (currentEndTime: string, endTime: string) =>
        timeString4digitsDiffMin(endTime, currentEndTime) < 0 ? endTime : currentEndTime,
      scheduleReadResult.schedule.endTime,
    );

  if (!startTime || !endTime) return <></>;

  const startTimeHour = parseInt(startTime.slice(0, 2), 10);
  const endTimeHour = parseInt(endTime.slice(0, 2), 10) + (parseInt(endTime.slice(-2), 10) > 0 ? 1 : 0);
  const scheduleRangeHour = endTimeHour - startTimeHour + 1;

  const oneMinuteHeightPercent = 100 / (scheduleRangeHour * 60);
  const nowTopPercent =
    Math.round(((now.getHours() - startTimeHour) * 60 + now.getMinutes()) * oneMinuteHeightPercent * 100) / 100;

  return (
    <div className='relative my-4 h-[calc(100%_-_2rem)] w-full min-w-fit rounded-md border border-gray-200 shadow-md'>
      <div className='absolute left-3 top-3 text-xl'>スケジュール</div>
      {scheduleReadResult.schedule.plans.some((plan) => plan.planType === CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO) && (
        <div className='absolute right-3 top-3 text-xl'>
          <BackToListButtonComponent />
        </div>
      )}
      <div className='relative mt-12 flex h-[calc(100%_-_3rem)] w-full min-w-fit'>
        {nowTopPercent >= 0 && nowTopPercent <= 92 && (
          <div
            className='absolute left-[8%] z-10 h-0 w-11/12'
            style={{
              top: 'calc(' + nowTopPercent + '% + 1rem - 1px)',
            }}
          >
            <div className='w-full border-t-4 border-red-500/70'></div>
            <div className='absolute -top-1.5 left-0 h-4 w-4 rounded-full border-8 border-red-500'></div>
          </div>
        )}
        <div className='relative flex h-full w-1/12 min-w-[5rem] justify-center'>
          {[...Array(scheduleRangeHour)].map((_, i) => {
            const hour = i + startTimeHour;
            return (
              <div
                key={'timeAxis' + i}
                className={'absolute mx-auto text-2xl'}
                style={{ top: Math.round(i * oneMinuteHeightPercent * 60 * 100) / 100 + '%' }}
              >
                {hour}:00
              </div>
            );
          })}
        </div>
        <div className='relative h-full w-11/12 min-w-[25rem]'>
          {[...Array(scheduleRangeHour)].map((_, i) => (
            <div
              key={'timeAxisBorder' + i}
              className={'absolute h-0 w-11/12 border-t'}
              style={{ top: 'calc(' + Math.round(i * oneMinuteHeightPercent * 60 * 100) / 100 + '% + 1rem)' }}
            ></div>
          ))}
          {scheduleReadResult?.schedule.plans.map((plan) => (
            <PlanCardComponent
              key={plan.id}
              plan={plan}
              start={startTimeHour}
              oneMinuteHeightPercent={oneMinuteHeightPercent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
