import { FormEvent, useState, useRef, useEffect } from 'react';
import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { SimpleInputComponent } from '@/components/atoms/SimpleInputComponent';
import SliderComponent from '@/components/atoms/SliderComponent';
import { RegisterTodoModalComponent } from '@/components/molecules/RegisterTodoModalComponent';
import { CONSTANT } from '@/constant/default';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';

type Props = {
  showsModal: boolean;
  handleShowsModal: (showsModal: boolean) => void;
};
export const RegisterTodoComponent = (props: Props) => {
  const [title, setTitle] = useState<string>(CONSTANT.DEFAULT.PLAN.TITLE);
  const [processTime, setProcessTime] = useState<number[]>(CONSTANT.DEFAULT.PLAN.REGISTER_TODO.PROCESS_TIME);
  const inputRef = useRef<HTMLInputElement>(null);

  const [createPlan] = useCreatePlanMutation();

  useEffect(() => {
    focusOnInput();
  }, [inputRef]);

  const focusOnInput = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const data: CreateForm = {
      title: title,
      processTime: processTime[0],
      priority: CONSTANT.DEFAULT.PLAN.PRIORITY,
      isRequiredPlan: CONSTANT.DEFAULT.PLAN.IS_REQUIRED_PLAN,
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
    props.handleShowsModal(true);
  };

  const handleClose = () => {
    props.handleShowsModal(false);
  };

  return (
    <div className='relative h-[calc(100%_-_1rem)] w-full rounded-md border-2 border-indigo-300 bg-white'>
      <form className='py-4' id='register-todo-form' onSubmit={handleSubmit}>
        <div className='mx-auto w-4/5'>
          <SimpleInputComponent
            ref={inputRef}
            id='title'
            name='title'
            type='text'
            placeholder='タイトル'
            value={title}
            setter={setTitle}
            extraClassName='focus:outline-none'
          />
        </div>
        <div className='inset-x-0 mx-auto mt-4 w-4/5' onClick={focusOnInput}>
          <SliderComponent min={15} max={120} title='所要時間' unit='分' values={processTime} setter={setProcessTime} />
        </div>
        <div className='mx-auto mt-4 w-4/5'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='その他のオプション'
            handleClick={handleClickOption}
          />
        </div>
      </form>
      {props.showsModal && (
        <RegisterTodoModalComponent
          showsModal={props.showsModal}
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
