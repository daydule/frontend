import React, { CSSProperties, memo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { twMerge } from 'tailwind-merge';
import { ItemTypes } from './ScheduleComponent';
import { DeletePlanButtonComponent } from '@/components/features/main/tree/DeletePlanButtonComponent';
import { UpdatePlanModalComponent } from '@/components/features/main/tree/UpdatePlanModalComponent';
import { UpdateScheduledTodoModalComponent } from '@/components/features/main/tree/UpdateScheduledTodoModalComponent';
import { CONSTANT } from '@/constant/default';
import { formatToDisplayString } from '@/helpers/dateHelper';
import { Plan } from '@/redux/types';

type Props = {
  plan: Plan;
  style: CSSProperties;
};

const getStyle = (style: CSSProperties, isDragging: boolean) => {
  return {
    ...style,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 100 : 0,
    cursor: isDragging ? 'grabbing' : 'grab',
  };
};

export const PlanCardComponent = memo(function PlanCardComponent(props: Props) {
  console.log('PlanCardComponent', props.plan.title);
  const [showsModal, setShowsModal] = useState<boolean>(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.PLAN_CARD,
      item: { plan: props.plan },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props.plan],
  );

  const isTodoBefore = props.plan.planType === CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO;
  const subMessage = isTodoBefore && props.plan.parentPlanId != null ? '※ 分割された他のTODOも削除されます。' : '';
  const bgColor = isTodoBefore ? 'bg-indigo-300 bg-opacity-80 hover:bg-opacity-100' : 'bg-blue-400 hover:bg-blue-500';
  const className = twMerge('flex absolute left-[5%] w-4/5 rounded-lg px-4 border items-center text-md', bgColor);

  return (
    <div
      className={className}
      style={getStyle(props.style, isDragging)}
      ref={drag}
      role='PlanCardComponent'
      onClick={() => setShowsModal(true)}
    >
      <div className='flex w-3/4'>
        <div className='w-1/3 truncate'>{props.plan.title}</div>
        {formatToDisplayString(props.plan.startTime)} 〜 {formatToDisplayString(props.plan.endTime)}
      </div>
      <div className='w-1/4'>
        <DeletePlanButtonComponent size={1.5} planId={props.plan.id} subMessage={subMessage} />
      </div>
      {showsModal && !isTodoBefore && (
        <UpdatePlanModalComponent showsModal={showsModal} handleClose={() => setShowsModal(false)} plan={props.plan} />
      )}
      {showsModal && isTodoBefore && (
        <UpdateScheduledTodoModalComponent
          showsModal={showsModal}
          handleClose={() => setShowsModal(false)}
          todo={props.plan}
        />
      )}
    </div>
  );
});
