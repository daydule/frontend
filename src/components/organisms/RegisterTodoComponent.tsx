import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { CONSTANT } from '@/config/const';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';
import { FormEvent, useState } from 'react';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import SliderComponent from '../atoms/SliderComponent';

export const RegisterTodoComponent = () => {
  const [title, setTitle] = useState<string>(CONSTANT.DEFAULT.PLAN.TITLE);
  const [processTime, setProcessTime] = useState<number[]>(CONSTANT.DEFAULT.PLAN.REGISTER_TODO.PROCESS_TIME);
  const [createPlan] = useCreatePlanMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // リロードが走らないように入れている
    event.preventDefault();
    const data: CreateForm = {
      title: title,
      processTime: processTime[0],
      planType: CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO,
      priority: CONSTANT.DEFAULT.PLAN.PRIORITY,
    };
    try {
      await createPlan(data).unwrap();
      setTitle(CONSTANT.DEFAULT.PLAN.TITLE);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className='border border-gray-200 shadow-md rounded-md w-96 h-[calc(25%_-_1rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>TODO</div>
      <form className='mt-3' id='register-todo-form' onSubmit={handleSubmit}>
        <div className='mx-auto w-3/5'>
          <SimpleInputComponent<string>
            id='title'
            name='title'
            type='text'
            placeholder='タイトル'
            value={title}
            setter={setTitle}
          />
        </div>
        <div className='mt-4 mx-auto w-3/5'>
          <SliderComponent min={15} max={120} title='所要時間' unit='分' values={processTime} setter={setProcessTime} />
        </div>
        <div className='absolute bottom-3 right-16 text-md'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='その他のオプション'
            handleClick={() => {}}
          />
        </div>
        <div className='absolute bottom-3 right-3 text-md'>
          <ButtonComponent type='submit' children='登録' />
        </div>
      </form>
    </div>
  );
};
