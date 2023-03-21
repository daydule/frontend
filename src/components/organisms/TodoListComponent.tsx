import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { useReadScheduleQuery } from '@/redux/schedule/slice';
import { TodoCardComponent } from '@/components/molecules/TodoCardComponent';

export const TodoListComponent = () => {
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: formatToYYYY_MM_DD(new Date()) });
  return (
    <div className='border border-gray-100 shadow-md rounded-md w-96 h-[calc(50%_-_2rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>TODO一覧</div>
      <div className='mt-[10%] overflow-auto h-5/6'>
        {scheduleReadResult?.todos.map((todo) => (
          <TodoCardComponent key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
