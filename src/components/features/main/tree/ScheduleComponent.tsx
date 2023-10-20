import React, { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { BackToListButtonComponent } from './BackToListButtonComponent';
import { PlanCardComponent } from './PlanCardComponent';
import { CONSTANT } from '@/constant/default';
import {
  formatDateToTimeString4digits,
  formatToDate,
  formatToYYYY_MM_DD,
  getTimeString4digits,
  getTimeString4digitsDiffMin,
  roundTimeString4digitsToQuarterHour,
} from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { getHeightPercent, getPositionPercent } from '@/helpers/scheduleHelper';
import { UpdateForm, useUpdatePlanMutation } from '@/redux/plan/slice';
import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { Plan } from '@/redux/types';

export const ItemTypes = {
  PLAN_CARD: 'PLAN_CARD',
};

export const ScheduleComponent = () => {
  const SCHEDULE_RANGE_MAX_PERCENT = 90;

  const [now, setNow] = useState<Date>(new Date());
  const dateString = formatToYYYY_MM_DD(now);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  const [updatePlan] = useUpdatePlanMutation();
  const scheduleTableElement = useRef<HTMLInputElement>(null);

  // NOTE: 現在時刻バー表示更新のために、1分ごとに現在時刻を更新する
  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(timerId);
  }, [now]);

  // NOTE: スケジュールの開始、終了時間外の予定がある場合は、表示を拡大する
  const scheduleStartTime =
    scheduleReadResult?.schedule.plans
      .map((plan) => plan.startTime)
      .reduce(
        (currentStartTime: string, startTime: string) =>
          getTimeString4digitsDiffMin(startTime, currentStartTime) > 0 ? startTime : currentStartTime,
        scheduleReadResult.schedule.startTime,
      ) ?? CONSTANT.DEFAULT.SCHEDULE.START_TIME;
  const scheduleEndTime =
    scheduleReadResult?.schedule.plans
      .map((plan) => plan.endTime)
      .reduce(
        (currentEndTime: string, endTime: string) =>
          getTimeString4digitsDiffMin(endTime, currentEndTime) < 0 ? endTime : currentEndTime,
        scheduleReadResult?.schedule.endTime,
      ) ?? CONSTANT.DEFAULT.SCHEDULE.END_TIME;

  const scheduleStartTimeHour = scheduleStartTime ? parseInt(scheduleStartTime?.slice(0, 2), 10) : 9;
  const scheduleEndTimeHour = scheduleEndTime
    ? parseInt(scheduleEndTime?.slice(0, 2), 10) + (parseInt(scheduleEndTime?.slice(-2), 10) > 0 ? 1 : 0)
    : 18;
  const scheduleRangeHour = scheduleEndTimeHour - scheduleStartTimeHour + 1;

  const oneMinuteHeightPercent = 100 / (scheduleRangeHour * 60);
  const nowTopPercent =
    Math.round(((now.getHours() - scheduleStartTimeHour) * 60 + now.getMinutes()) * oneMinuteHeightPercent * 100) / 100;

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.PLAN_CARD,
      drop: (item: { plan: Plan }, monitor) => {
        const scheduleTableHeight = scheduleTableElement?.current?.getBoundingClientRect().height;
        const delta = monitor.getDifferenceFromInitialOffset();
        const plan = item.plan;
        const deltaPercent = delta?.y && scheduleTableHeight ? (delta?.y / scheduleTableHeight) * 100 : 0;
        const previousTopPositionPercent = getPositionPercent(
          plan.startTime,
          oneMinuteHeightPercent,
          scheduleStartTimeHour,
        );
        const newTopPositionPercent = previousTopPositionPercent + deltaPercent;
        const notRoundedStartTime = getTimeString4digits(
          newTopPositionPercent,
          oneMinuteHeightPercent,
          scheduleStartTimeHour,
        );
        const newStartTime = roundTimeString4digitsToQuarterHour(notRoundedStartTime);
        const processTime = getTimeString4digitsDiffMin(plan.startTime, plan.endTime);
        const newStartDate = formatToDate(newStartTime);
        newStartDate.setMinutes(newStartDate.getMinutes() + processTime);
        const newEndTime = formatDateToTimeString4digits(newStartDate);

        // NOTE: スケジュール外でドロップした場合は、何もしない
        const isOverScheduleRange =
          getTimeString4digitsDiffMin(scheduleStartTime, newStartTime) < 0 ||
          getTimeString4digitsDiffMin(newEndTime, scheduleEndTime) < 0;
        if (isOverScheduleRange) return;

        const data: UpdateForm = {
          id: Number(plan.id),
          title: plan.title,
          date: formatToYYYY_MM_DD(new Date(plan.date)),
          startTime: newStartTime,
          endTime: newEndTime,
          processTime: plan.processTime === null ? undefined : plan.processTime,
          context: plan.context === null ? undefined : plan.context,
          place: plan.place === null ? undefined : plan.place,
          isRequiredPlan: plan.isRequiredPlan,
          priority: CONSTANT.DEFAULT.PLAN.PRIORITY,
          planType: plan.planType,
        };
        try {
          updatePlan(data).unwrap().catch(errorHandler);
        } catch (e) {
          console.error(e);
        }
      },
    }),
    [scheduleReadResult],
  );

  return (
    <div className='relative my-4 h-[calc(100%_-_2rem)] w-full min-w-fit rounded-md border border-gray-200 shadow-md'>
      <div className='absolute left-3 top-3 text-xl'>スケジュール</div>
      {scheduleReadResult?.schedule.plans.some((plan) => plan.planType === CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO) && (
        <div className='absolute right-3 top-3 text-xl'>
          <BackToListButtonComponent />
        </div>
      )}
      <div className='relative mt-12 flex h-[calc(100%_-_3rem)] w-full min-w-fit' ref={scheduleTableElement}>
        {nowTopPercent >= 0 && nowTopPercent <= SCHEDULE_RANGE_MAX_PERCENT && (
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
            const hour = i + scheduleStartTimeHour;
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
        <div ref={drop} className='relative h-full w-11/12 min-w-[25rem]'>
          {[...Array(scheduleRangeHour)].map((_, i) => (
            <div
              key={'timeAxisBorder' + i}
              className={'absolute h-0 w-11/12 border-t'}
              style={{ top: 'calc(' + Math.round(i * oneMinuteHeightPercent * 60 * 100) / 100 + '% + 1rem)' }}
            ></div>
          ))}
          {scheduleReadResult?.schedule.plans.map((plan) => {
            const style = {
              top: `calc(${getPositionPercent(plan.startTime, oneMinuteHeightPercent, scheduleStartTimeHour)}% + 1rem)`,
              height: getHeightPercent(plan.startTime, plan.endTime, oneMinuteHeightPercent) + '%',
            };
            return <PlanCardComponent key={plan.id} plan={plan} style={style} />;
          })}
        </div>
      </div>
    </div>
  );
};
