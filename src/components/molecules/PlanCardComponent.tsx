import { timeString4digitsDiffMin } from '@/helpers/dateHelper';
import { Plan } from '@/redux/plan/type';
import React from 'react';
import { DeletePlanButtonComponent } from '@/components/molecules/deletePlanButtonComponent';

type Props = {
  plan: Plan;
  start: number;
  minuteHeightPercent: number;
};

export const PlanCardComponent = (props: Props) => {
  const startHour = parseInt(props.plan.startTime.slice(0, 2), 10) - props.start;
  const startMinute = parseInt(props.plan.startTime.slice(-2), 10);
  const top = Math.round((startHour * 60 + startMinute) * props.minuteHeightPercent * 100) / 100;
  const processTime = timeString4digitsDiffMin(props.plan.startTime, props.plan.endTime);
  const height = processTime * props.minuteHeightPercent;

  if (top > 100 || height <= 0) return <React.Fragment key={props.plan.id}></React.Fragment>;
  const style = {
    top: 'calc(' + top + '% + 1rem)',
    height: height + '%',
  };
  return (
    <div
      className='flex absolute left-[5%] w-4/5 bg-blue-400 shadow-lg rounded-lg px-4 border items-center text-md'
      style={style}
    >
      <div className='w-1/4'>{props.plan.title}</div>
      <div className='w-1/4'>{props.plan.startTime}</div>
      <div className='w-1/4'>{props.plan.endTime}</div>
      <div className='w-1/4'>
        <DeletePlanButtonComponent size={processTime < 30 ? 1 : 1.5} planId={props.plan.id} />
      </div>
    </div>
  );
};
