import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { AvailableTimeRangeComponent } from '../leaf/AvailableTimeRangeComponent';
import { CurrentTimeBarComponent } from '../leaf/CurrentTimeBarComponent';
import { BackToListButtonComponent } from './BackToListButtonComponent';
import { PlanCardComponent } from './PlanCardComponent';
import { CONSTANT } from '@/constant/default';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { getHeight, getNewTimeAfterDropped, getNowPosition, getPosition } from '@/helpers/scheduleHelper';
import { UpdateForm, useUpdatePlanMutation } from '@/redux/plan/slice';
import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { Plan } from '@/redux/types';

export const ItemTypes = {
  PLAN_CARD: 'PLAN_CARD',
};

export const ScheduleComponent = () => {
  const DEFAULT_ONE_MINUTE_HEIGHT = 1;
  const SCHEDULE_RANGE_HOUR = 25;
  const [oneMinuteHeight, setOneMinuteHeight] = useState(DEFAULT_ONE_MINUTE_HEIGHT);
  const scheduleTableRef = useRef<HTMLDivElement | null>(null);
  const now = new Date();
  const dateString = formatToYYYY_MM_DD(now);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  const [updatePlan] = useUpdatePlanMutation();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // NOTE: 初回描画時に現在時刻をスケジュール表の上から1/3ほどの位置にするために、スクロールする
    const scrollRefHeight = scheduleTableRef.current?.clientHeight ?? DEFAULT_ONE_MINUTE_HEIGHT * 60;
    setScrollPosition(getNowPosition(DEFAULT_ONE_MINUTE_HEIGHT) - scrollRefHeight / 3);

    const node = scheduleTableRef.current;
    node?.addEventListener('wheel', handleZoom);
    return () => {
      // NOTE: コンポーネントのクリーンアップ時にwheelイベントのリスナーを削除する
      node?.removeEventListener('wheel', handleZoom);
    };
  }, []);

  const handleZoom = (event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();
      const rect = scheduleTableRef.current?.getBoundingClientRect();
      const mouseYRelative = event.clientY - (rect?.top ?? 0);

      setOneMinuteHeight((currentOneMinuteHeight) => {
        const delta = -Math.round(event.deltaY * 100) * 0.0001;
        const newOneMinuteHeight = currentOneMinuteHeight + (delta > 0 ? Math.min(delta, 0.1) : Math.max(delta, -0.1));
        if (newOneMinuteHeight < 1 || 5 < newOneMinuteHeight) return currentOneMinuteHeight;

        const currentScrollTop = scheduleTableRef.current?.scrollTop ?? 0;
        const currentTimeAtMouse = (currentScrollTop + mouseYRelative) / currentOneMinuteHeight;

        const newScrollPosition = currentTimeAtMouse * newOneMinuteHeight - mouseYRelative;
        setScrollPosition(newScrollPosition);
        return newOneMinuteHeight;
      });
    }
  };

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
    [oneMinuteHeight],
  );

  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      scheduleTableRef.current = node;
      drop(node);
    },
    [drop],
  );

  const scrollByPixels = (px: number) => {
    if (scheduleTableRef.current) {
      scheduleTableRef.current.scrollBy({ top: px, behavior: 'smooth' });
    }
  };

  const scrollToPosition = (position: number) => {
    if (scheduleTableRef.current) {
      scheduleTableRef.current.scrollTo({ top: position, behavior: 'auto' });
    }
  };

  // NOTE: 現在時刻バーが画面内に入るように、1分ごとにoneMinuteHeightだけスクロールする
  useEffect(() => {
    const timerId = setInterval(() => {
      scrollByPixels(oneMinuteHeight);
    }, 60000);
    return () => clearInterval(timerId);
  }, [oneMinuteHeight]);

  useEffect(() => {
    scrollToPosition(scrollPosition);
  }, [scrollPosition]);

  const calcTopOfTimeAxis = useCallback(
    (hour: number) => {
      return hour * oneMinuteHeight * 60;
    },
    [oneMinuteHeight],
  );

  return (
    <div className='relative my-4 h-[calc(100%_-_2rem)] w-full min-w-fit rounded-md border border-gray-200 shadow-md'>
      <div className='absolute left-3 top-3 text-xl'>スケジュール</div>
      {scheduleReadResult?.schedule.plans.some((plan) => plan.planType === CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO) && (
        <div className='absolute right-3 top-3 text-xl'>
          <BackToListButtonComponent />
        </div>
      )}
      <div ref={setRefs} className='relative mt-12 flex h-[calc(100%_-_3rem)] w-full min-w-fit overflow-y-scroll'>
        <div className='absolute left-[8%] z-10 mt-4 w-11/12' style={{ top: getNowPosition(oneMinuteHeight) }}>
          <CurrentTimeBarComponent />
        </div>
        <div className='relative flex h-full w-1/12 min-w-[5rem] justify-center'>
          {[...Array(SCHEDULE_RANGE_HOUR)].map((_, hour) => {
            return (
              <div
                key={'timeAxis' + hour}
                className={'absolute mx-auto text-2xl'}
                style={{ top: calcTopOfTimeAxis(hour) }}
              >
                {hour}:00
              </div>
            );
          })}
        </div>
        <div className='relative mt-4 h-full w-11/12 min-w-[25rem]'>
          {scheduleReadResult && (
            <div
              className='absolute w-full'
              style={{
                top: getPosition(scheduleReadResult.schedule.startTime, oneMinuteHeight),
                height: getHeight(
                  scheduleReadResult.schedule.startTime,
                  scheduleReadResult.schedule.endTime,
                  oneMinuteHeight,
                ),
              }}
            >
              <AvailableTimeRangeComponent />
            </div>
          )}
          {[...Array(SCHEDULE_RANGE_HOUR)].map((_, hour) => (
            <div
              key={'timeAxisBorder' + hour}
              className={'absolute h-0 w-11/12 border-t'}
              style={{ top: calcTopOfTimeAxis(hour) }}
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
