import { Plan } from '@/redux/plan/type';

type Props = {
  todo: Plan;
};

export const TodoCardComponent = (props: Props) => {
  return (
    <div
      key={props.todo.id}
      className='w-10/12 p-5 my-1 mx-auto rounded-md bg-indigo-300 text-white flex justify-between'
    >
      <div className='text-center text-lg'>{props.todo.title}</div>
      <div className='text-center  text-xl'>{props.todo.processTime}</div>
    </div>
  );
};
