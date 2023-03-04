import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { TodoCardComponent } from '../atoms/TodoCardComponent';

export const TodoListComponent = () => {
  const d = new Date();
  const dateString = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  return (
    <div className='border border-black rounded-md w-96 h-[calc(50%_-_2rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>TODO一覧</div>
      <div className='mt-[10%] overflow-auto h-5/6'>
        {scheduleReadResult?.todos.map((todo) => (
          <TodoCardComponent todo={todo} />
        ))}
      </div>
    </div>
  );
};
