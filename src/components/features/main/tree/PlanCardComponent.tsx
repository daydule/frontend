import React, { memo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DeletePlanButtonComponent } from '@/components/features/main/tree/DeletePlanButtonComponent';
import { UpdatePlanModalComponent } from '@/components/features/main/tree/UpdatePlanModalComponent';
import { UpdateScheduledTodoModalComponent } from '@/components/features/main/tree/UpdateScheduledTodoModalComponent';
import { CONSTANT } from '@/constant/default';
import { formatToDisplayString } from '@/helpers/dateHelper';
import { Plan } from '@/redux/types';

type Props = {
  plan: Plan;
};

export const PlanCardComponent = memo(function PlanCardComponent(props: Props) {
  const [showsModal, setShowsModal] = useState<boolean>(false);

  const isTodoBefore = props.plan.planType === CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO;
  const subMessage = isTodoBefore && props.plan.parentPlanId != null ? '※ 分割された他のTODOも削除されます。' : '';
  const bgColor = isTodoBefore ? 'bg-indigo-300 bg-opacity-80 hover:bg-opacity-100' : 'bg-blue-400 hover:bg-blue-500';
  const baseClass = 'flex w-full h-full rounded-lg px-4 border items-center text-md';
  const className = twMerge(baseClass, bgColor);

  return (
    <div className={className} role='PlanCardComponent' onClick={() => setShowsModal(true)}>
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
