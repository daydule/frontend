import React from 'react';
import { useDrop } from 'react-dnd';
import { CurrentTimeBarComponent } from '../leaf/CurrentTimeBarComponent';
import { BackToListButtonComponent } from './BackToListButtonComponent';
import { PlanCardComponent } from './PlanCardComponent';
import { CONSTANT } from '@/constant/default';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { getHeight, getNewTimeAfterDropped, getPosition } from '@/helpers/scheduleHelper';
import { UpdateForm, useUpdatePlanMutation } from '@/redux/plan/slice';
import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { Plan } from '@/redux/types';

export const ItemTypes = {
  PLAN_CARD: 'PLAN_CARD',
};

export const ScheduleComponent = () => {
  // TODO: 将来的にユーザーがスケジュール表の1分の高さを変更できるようにする
  const oneMinuteHeight = 1;

  const now = new Date();
  const dateString = formatToYYYY_MM_DD(now);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  const [updatePlan] = useUpdatePlanMutation();

  const SCHEDULE_RANGE_HOUR = 25;

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.PLAN_CARD,
      drop: (item: { plan: Plan }, monitor) => {
        const plan = item.plan;
        const deltaY = monitor.getDifferenceFromInitialOffset()?.y ?? 0;
        const { newStartTime, newEndTime } = getNewTimeAfterDropped(plan, deltaY, oneMinuteHeight);
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
      <div ref={drop} className='relative mt-12 flex h-[calc(100%_-_3rem)] w-full min-w-fit overflow-y-scroll'>
        <CurrentTimeBarComponent oneMinuteHeight={oneMinuteHeight} />
        <div className='relative flex h-full w-1/12 min-w-[5rem] justify-center'>
          {[...Array(SCHEDULE_RANGE_HOUR)].map((_, hour) => {
            return (
              <div
                key={'timeAxis' + hour}
                className={'absolute mx-auto text-2xl'}
                style={{ top: Math.round(hour * oneMinuteHeight * 60 * 100) / 100 + 'px' }}
              >
                {hour}:00
              </div>
            );
          })}
        </div>
        <div className='relative mt-4 h-full w-11/12 min-w-[25rem]'>
          {[...Array(SCHEDULE_RANGE_HOUR)].map((_, hour) => (
            <div
              key={'timeAxisBorder' + hour}
              className={'absolute h-0 w-11/12 border-t'}
              style={{ top: hour * 60 * oneMinuteHeight }}
            ></div>
          ))}
          {scheduleReadResult?.schedule.plans.map((plan) => {
            const style = {
              top: getPosition(plan.startTime, oneMinuteHeight),
              height: getHeight(plan.startTime, plan.endTime, oneMinuteHeight),
            };
            return <PlanCardComponent key={plan.id} plan={plan} style={style} />;
          })}
        </div>
      </div>
    </div>
  );
};
