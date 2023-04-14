import { Plan } from '@/redux/types';
import { DeletePlanButtonComponent } from './deletePlanButtonComponent';

type Props = {
  todo: Plan;
  isDragging: boolean;
};

export const TodoCardComponent = (props: Props) => {
  const className =
    (props.isDragging ? 'w-full' : 'w-[calc(100%_-_2rem)] mx-4') +
    ' ' +
    'h-16 px-4 my-2 rounded-md bg-indigo-300 shadow-lg text-white flex justify-between items-center';

  return (
    <div className={className}>
      <div className='text-center text-lg'>{props.todo.title}</div>
      <div className='text-center text-xl flex'>
        <div>{props.todo.processTime}</div>
        <DeletePlanButtonComponent size={1.5} planId={props.todo.id} />
      </div>
    </div>
  );
};
