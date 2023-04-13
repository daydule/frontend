import { Plan } from '@/redux/plan/type';
import { ButtonWithIconComponent } from '@/components/atoms/ButtonWithIconComponent';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { FormEvent } from 'react';
import { useDeletePlanMutation } from '@/redux/plan/slice';

type Props = {
  todo: Plan;
  isDragging: boolean;
};

export const TodoCardComponent = (props: Props) => {
  const [deletePlan] = useDeletePlanMutation();

  const handleDeleteSubmit = async (event: FormEvent<HTMLFormElement>, id: number) => {
    // リロードが走らないように入れている
    event.preventDefault();
    deletePlan({ id });
  };

  const className =
    (props.isDragging ? 'w-full' : 'w-[calc(100%_-_2rem)] mx-4') +
    ' ' +
    'h-16 px-4 my-2 rounded-md bg-indigo-300 shadow-lg text-white flex justify-between items-center';

  return (
    <div className={className}>
      <div className='text-center text-lg'>{props.todo.title}</div>
      <div className='text-center text-xl flex'>
        <div>{props.todo.processTime}</div>
        <div>
          <form id='delete-todo-form' onSubmit={(event) => handleDeleteSubmit(event, props.todo.id)}>
            <ButtonWithIconComponent
              type='submit'
              icon={<MdOutlineDeleteForever />}
              size={1.5}
            ></ButtonWithIconComponent>
          </form>
        </div>
      </div>
    </div>
  );
};
