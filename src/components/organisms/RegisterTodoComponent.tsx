import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { CONSTANT } from '@/constant/default';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';
import { FormEvent, useState } from 'react';
import { SimpleInputComponent } from '@/components/atoms/SimpleInputComponent';
import SliderComponent from '@/components/atoms/SliderComponent';
import { RegisterTodoModalComponent } from '@/components/molecules/RegisterTodoModalComponent';
import { errorHandler } from '@/helpers/errorHandlerHelper';

type Props = {
  handleToggleArea: () => void;
};
export const RegisterTodoComponent = (props: Props) => {
  const [title, setTitle] = useState<string>(CONSTANT.DEFAULT.PLAN.TITLE);
  const [processTime, setProcessTime] = useState<number[]>(CONSTANT.DEFAULT.PLAN.REGISTER_TODO.PROCESS_TIME);

  const [createPlan] = useCreatePlanMutation();

  const [showsModal, setShowsModal] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const data: CreateForm = {
      title: title,
      processTime: processTime[0],
      priority: CONSTANT.DEFAULT.PLAN.PRIORITY,
      planType: CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO,
    };
    try {
      await createPlan(data)
        .unwrap()
        .then(() => setTitle(CONSTANT.DEFAULT.PLAN.TITLE))
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickOption = () => {
    setShowsModal(true);
  };

  const handleClose = () => {
    setShowsModal(false);
  };

  return (
    <div className='w-96 h-[calc(100%_-_1rem)] my-4 relative'>
      <form className='mt-5' id='register-todo-form' onSubmit={handleSubmit}>
        <div className='ml-9 pt-1 w-3/5'>
          <SimpleInputComponent<string>
            id='title'
            name='title'
            type='text'
            placeholder='タイトル'
            value={title}
            setter={setTitle}
          />
        </div>
        <div className='mt-4 ml-9 w-3/5'>
          <SliderComponent min={15} max={120} title='所要時間' unit='分' values={processTime} setter={setProcessTime} />
        </div>
        <div className='absolute top-0 right-12 text-md'>
          <ButtonComponent type='submit' children='登録' />
        </div>
        <div className='absolute top-12 right-12 text-md'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='詳細'
            handleClick={handleClickOption}
          />
        </div>
        <div className='absolute inset-x-0 bottom-3  mx-auto w-2/4 text-sm'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='閉じる'
            handleClick={props.handleToggleArea}
          />
        </div>
      </form>
      {showsModal && (
        <RegisterTodoModalComponent
          showsModal={showsModal}
          handleClose={handleClose}
          title={title}
          setTitle={setTitle}
          processTime={processTime}
          setProcessTime={setProcessTime}
        />
      )}
    </div>
  );
};
