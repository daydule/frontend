import { RedirectWithAuthCheckComponent } from '@/components/molecules/RedirectWithAuthCheckComponent';
import { RegisterPlanComponent } from '@/components/organisms/RegisterPlanComponent';
import { ScheduleComponent } from '@/components/organisms/ScheduleComponent';
import { TodoListComponent } from '@/components/organisms/TodoListComponent';

const MainPage = () => {
  return (
    <RedirectWithAuthCheckComponent checkLevel='onlyLogin'>
      <div className='flex h-full'>
        <div className='h-full w-96'>
          <RegisterPlanComponent />
          <TodoListComponent />
        </div>
        <div className='mx-4 h-full w-[calc(100%_-_25rem)]'>
          <ScheduleComponent />
        </div>
      </div>
    </RedirectWithAuthCheckComponent>
  );
};

export default MainPage;
