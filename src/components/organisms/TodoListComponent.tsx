import { scheduleReadResult, useReadScheduleQuery } from '@/redux/schedule/slice';

export const TodoListComponent = () => {
  const d = new Date();
  const dateString = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  return (
    <div className='border border-black w-1/3 h-1/2 my-2'>
      <div className='text-left text-2xl m-6'>TODO一覧</div>
      {scheduleReadResult?.todos.map((todo) => (
        <div key={todo.id} className='w-full p-5 border border-black'>
          {todo.title}
        </div>
      ))}
    </div>
  );
};
