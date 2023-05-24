import { RegisterPlanComponent } from '@/components/organisms/RegisterPlanComponent';
import { RegisterTodoComponent } from '@/components/organisms/RegisterTodoComponent';
import { ScheduleComponent } from '@/components/organisms/ScheduleComponent';
import { TodoListComponent } from '@/components/organisms/TodoListComponent';
import { RedirectWithAuthCheckComponent } from '@/components/utils/RedirectWithAuthCheckComponent';

const MainPage = () => {
  return (
    <RedirectWithAuthCheckComponent checkLevel='onlyLogin'>
      <div className='flex h-full'>
        <div className='w-96 h-hull'>
          <RegisterPlanComponent />
          <RegisterTodoComponent />
          <TodoListComponent />
        </div>
        <div className='w-[calc(100%_-_25rem)] h-full mx-4'>
          <ScheduleComponent />
        </div>
      </div>
    </RedirectWithAuthCheckComponent>
  );
};

export default MainPage;
