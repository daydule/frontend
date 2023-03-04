import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { CONST } from '@/config/const';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';
import { useState } from 'react';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';

export const RegisterTodoComponent = () => {
  const defaultTitle = CONST.default.planTitle;
  const defaultProcessTime = CONST.default.planProcessTime;
  const [title, setTitle] = useState<string>(defaultTitle);
  const [processTime, setProcessTime] = useState<number>(defaultProcessTime);
  const [createPlan, { isLoading, isError, isSuccess, status }] = useCreatePlanMutation();

  const onClickRegister = async () => {
    const data: CreateForm = {
      title: title,
      processTime: processTime,
      priority: 1,
      planType: 2,
    };
    try {
      await createPlan(data).unwrap();
      setTitle(defaultTitle);
      setProcessTime(defaultProcessTime);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className='border border-black rounded-md w-96 h-[calc(25%_-_1rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>TODO</div>
      <form id='register-todo-form'>
        <div className='mt-10 mx-auto xl:w-3/5 w-4/5'>
          <SimpleInputComponent<string>
            id='title'
            name='title'
            type='text'
            placeholder='タイトル'
            value={title}
            setter={setTitle}
          />
        </div>
        <div className='mt-2 mx-auto xl:w-3/5 w-4/5'>
          <SimpleInputComponent<number>
            id='processTime'
            name='processTime'
            type='number'
            placeholder='所要時間'
            value={processTime}
            setter={setProcessTime}
          />
        </div>
        <div className='mt-2 mx-auto xl:w-1/5 w-2/5'>
          <ButtonComponent type='button' children='登録' onClick={onClickRegister} />
        </div>
      </form>
    </div>
  );
};
