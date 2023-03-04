import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { CONST } from '@/config/const';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';
import { useState } from 'react';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';

export const RegisterPlanComponent = () => {
  const defaultTitle = CONST.default.planTitle;
  const [title, setTitle] = useState<string>(defaultTitle);
  const [createPlan, { isLoading, isError, isSuccess, status }] = useCreatePlanMutation();

  const onClickRegister = async () => {
    const data: CreateForm = {
      title: title,
      startTime: '0945',
      endTime: '1000',
      priority: 1,
      planType: 0,
    };
    try {
      await createPlan(data).unwrap();
      setTitle(defaultTitle);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className='border border-black rounded-md w-1/3 h-1/4 my-2'>
      <div className='text-left text-xl m-2'>予定</div>
      <form id='register-todo-form'>
        <div className='my-1 mx-auto xl:w-3/5 w-4/5'>
          <SimpleInputComponent<string>
            id='title'
            name='title'
            type='text'
            placeholder='タイトル'
            value={title}
            setter={setTitle}
          />
        </div>
        <div className='my-2 mx-auto xl:w-1/5 w-2/5'>
          <ButtonComponent type='button' children='登録' onClick={onClickRegister} />
        </div>
      </form>
    </div>
  );
};
