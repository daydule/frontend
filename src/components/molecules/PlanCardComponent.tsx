import React, { useState } from 'react';
import { DeletePlanButtonComponent } from '@/components/molecules/DeletePlanButtonComponent';
import { UpdatePlanModalComponent } from '@/components/molecules/UpdatePlanModalComponent';
import { CONSTANT } from '@/constant/default';
import { formatToTime, timeString4digitsDiffMin } from '@/helpers/dateHelper';
import { Plan } from '@/redux/types';

type Props = {
  plan: Plan;
  start: number;
  oneMinuteHeightPercent: number;
};

export const PlanCardComponent = (props: Props) => {
  const startHour = parseInt(props.plan.startTime.slice(0, 2), 10) - props.start;
  const startMinute = parseInt(props.plan.startTime.slice(-2), 10);
  const top = Math.round((startHour * 60 + startMinute) * props.oneMinuteHeightPercent * 100) / 100;
  const processTime = timeString4digitsDiffMin(props.plan.startTime, props.plan.endTime);
  const height = processTime * props.oneMinuteHeightPercent;

  const [showsModal, setShowsModal] = useState<boolean>(false);

  const handleClick = () => {
    setShowsModal(true);
  };

  const handleClose = () => {
    setShowsModal(false);
  };

  if (top > 100 || height <= 0) return <></>;
  const style = {
    top: 'calc(' + top + '% + 1rem)',
    height: height + '%',
  };

  const subMessage =
    props.plan.planType === CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO && props.plan.parentPlanId != null
      ? '※ 分割された他のTODOも削除されます。'
      : '';
  const bgColor = 'bg-blue-400 hover:bg-blue-500';

  return (
    <div
      className={
        'flex absolute left-[5%] w-4/5 rounded-lg px-4 border items-center text-md cursor-pointer duration-500' +
        ' ' +
        bgColor
      }
      style={style}
      onClick={handleClick}
    >
      <div className='flex w-3/4'>
        <div className='w-1/3 truncate'>{props.plan.title}</div>
        {formatToTime(props.plan.startTime)} 〜 {formatToTime(props.plan.endTime)}
      </div>
      <div className='w-1/4'>
        <DeletePlanButtonComponent size={processTime < 30 ? 1 : 1.5} planId={props.plan.id} subMessage={subMessage} />
      </div>
      {showsModal && <UpdatePlanModalComponent showsModal={showsModal} handleClose={handleClose} plan={props.plan} />}
    </div>
  );
};
