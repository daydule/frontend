import { RegisterTodoComponent } from '@/components/organisms/RegisterTodoComponent';
import { TodoListComponent } from '@/components/organisms/TodoListComponent';
import { AuthCheckComponent } from '@/components/utils/AuthCheckComponent';

const MainPage = () => {
  return (
    <AuthCheckComponent checkLevel='login'>
      <div>
        <RegisterTodoComponent />
        <TodoListComponent />
      </div>
    </AuthCheckComponent>
  );
};

export default MainPage;
