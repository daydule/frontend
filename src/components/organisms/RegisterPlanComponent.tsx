import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { CONSTANT } from '@/config/const';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';
import { useState } from 'react';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';

export const RegisterPlanComponent = () => {
  const [title, setTitle] = useState<string>(CONSTANT.DEFAULT.PLAN_TITLE);
  const [createPlan] = useCreatePlanMutation();

  const onClickRegister = async () => {
    const data: CreateForm = {
      title: title,
      date: new Date().toISOString(),
      startTime: '0945',
      endTime: '1000',
      priority: 1,
      planType: 0,
    };
    try {
      await createPlan(data).unwrap();
      setTitle(CONSTANT.DEFAULT.PLAN_TITLE);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className='border border-black rounded-md w-96 h-[calc(25%_-_1rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>予定</div>
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
        <div className='mt-2 mx-auto xl:w-1/5 w-2/5'>
          <ButtonComponent type='button' children='登録' onClick={onClickRegister} />
        </div>
      </form>
    </div>
  );
};
