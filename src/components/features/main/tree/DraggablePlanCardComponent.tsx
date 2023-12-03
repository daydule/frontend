import { useDrag } from 'react-dnd';
import { PlanCardComponent } from './PlanCardComponent';
import { ItemTypes } from './ScheduleComponent';
import { Plan } from '@/redux/types';

type Props = {
  plan: Plan;
};

export const DraggablePlanCardComponent = ({ plan }: Props) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.PLAN_CARD,
      item: { plan },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [plan],
  );

  const baseClass = 'w-full h-full';
  const draggingRelatedClass = isDragging ? 'opacity-30 cursor-grabbing' : 'opacity-100 cursor-grab';
  const className = `${baseClass} ${draggingRelatedClass}`;

  return (
    <div ref={dragRef} className={className}>
      <PlanCardComponent plan={plan} />
    </div>
  );
};
