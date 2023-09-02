import { useState } from 'react';
import { UpdateTodoModalComponent } from './UpdateTodoModalComponent';
import { DeletePlanButtonComponent } from '@/components/molecules/DeletePlanButtonComponent';
import { Plan } from '@/redux/types';

type Props = {
  todo: Plan;
  isDragging: boolean;
};

export const TodoCardComponent = (props: Props) => {
  const className =
    (props.isDragging ? 'z-20 w-full' : 'w-[calc(100%_-_2rem)] mx-4') +
    ' ' +
    'h-16 px-4 my-2 rounded-md bg-indigo-300/80 shadow-lg text-white flex justify-between items-center hover:bg-indigo-400 duration-300';

  const [showsModal, setShowsModal] = useState<boolean>(false);

  const handleClick = () => {
    setShowsModal(true);
  };

  const handleClose = () => {
    setShowsModal(false);
  };

  return (
    <div className={className} onClick={handleClick}>
      <div className='text-center text-lg'>{props.todo.title}</div>
      <div className='flex text-center text-xl'>
        <div>{props.todo.processTime}分</div>
        <DeletePlanButtonComponent size={1.5} planId={props.todo.id} />
      </div>
      {showsModal && <UpdateTodoModalComponent showsModal={showsModal} handleClose={handleClose} todo={props.todo} />}
    </div>
  );
};
