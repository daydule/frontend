import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { TodoCardComponent } from '../atoms/TodoCardComponent';

export const TodoListComponent = () => {
  const d = new Date();
  const dateString = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  return (
    <div className='border border-black rounded-md w-1/3 h-1/2'>
      <div className='text-left p-4 text-xl h-1/6 fixed'>TODO一覧</div>
      <div className='mt-[10%] overflow-auto h-5/6'>
        {scheduleReadResult?.todos.map((todo) => (
          <TodoCardComponent todo={todo} />
        ))}
      </div>
    </div>
  );
};
