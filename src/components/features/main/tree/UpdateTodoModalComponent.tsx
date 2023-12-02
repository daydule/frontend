import { FormEvent, useState } from 'react';
import { SimpleInputComponent } from '../../../common/leaf/SimpleInputComponent';
import SliderComponent from '../../../common/leaf/SliderComponent';
import { TextAreaComponent } from '../../../common/leaf/TextAreaComponent';
import { ButtonComponent } from '../../../common/tree/ButtonComponent';
import { InfoIconComponent } from '@/components/common/tree/InfoIconComponent';
import { ModalComponent } from '@/components/common/tree/ModalComponent';
import { CONSTANT } from '@/constant/default';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { UpdateForm, useUpdatePlanMutation } from '@/redux/plan/slice';
import { Plan } from '@/redux/types';

type Props = {
  showsModal: boolean;
  handleClose: () => void;
  todo: Plan;
};

export const UpdateTodoModalComponent = (props: Props) => {
  const [title, setTitle] = useState<string>(props.todo.title);
  const [processTime, setProcessTime] = useState<number[]>([props.todo.processTime]);
  const [context, setContext] = useState<string>(props.todo.context);
  const [place, setPlace] = useState<string>(props.todo.place);

  const [updatePlan] = useUpdatePlanMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const data: UpdateForm = {
      id: Number(props.todo.id),
      title: title,
      processTime: processTime[0],
      context: context === null ? undefined : context,
      place: place === null ? undefined : place,
      priority: CONSTANT.DEFAULT.PLAN.PRIORITY,
      planType: CONSTANT.DEFAULT.PLAN.PLAN_TYPE.TODO,
    };
    try {
      await updatePlan(data)
        .unwrap()
        .then(() => props.handleClose())
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  // NOTE: 最大値・最小値を計算しているのは、時間を割り当てられたTODOが更新されて所要時間が最大値以上になることがあるから
  const processTimeMax = Math.max(CONSTANT.DEFAULT.TODO.PROCESS_TIME_MAX, props.todo.processTime);
  const processTimeMin = Math.min(CONSTANT.DEFAULT.TODO.PROCESS_TIME_MIN, props.todo.processTime);

  return (
    <ModalComponent isOpen={props.showsModal} onClose={props.handleClose} title='TODO'>
      <form className='mt-3' id='register-plan-detail-form' onSubmit={handleSubmit}>
        <div className='flex w-full'>
          <div className='w-1/2'>
            <div className='mx-auto w-4/5'>
              <SimpleInputComponent
                id='title'
                name='title'
                type='text'
                placeholder='タイトル'
                value={title}
                setter={setTitle}
              />
            </div>
            <div className='mx-auto mt-2 flex w-4/5 items-center'>
              <div className='mx-auto mt-8 w-full'>
                <SliderComponent
                  min={processTimeMin}
                  max={processTimeMax}
                  title='所要時間'
                  unit='分'
                  values={processTime}
                  setter={setProcessTime}
                />
                <div className='relative bottom-[21px] left-[195px] z-50 h-0'>
                  <InfoIconComponent content='所要時間は「最小15分」「最大120分」で入力してください。' />
                </div>
              </div>
            </div>
            <div className='ml-[13%] mt-4 flex'>
              <div className='mr-2'>説明</div>
              <div className='mt-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                  />
                </svg>
              </div>
            </div>
            <div className='mx-auto w-5/6'>
              <TextAreaComponent
                id='plan-context'
                name='plan-context'
                value={context}
                extraClassName='min-h-[8rem]'
                handleChange={(event) => setContext(event.target.value)}
              />
            </div>
          </div>
          <div className='w-1/2'>
            <div className='mx-auto w-4/5'>
              <SimpleInputComponent
                id='place'
                name='place'
                type='text'
                placeholder='場所'
                value={place}
                setter={setPlace}
              />
            </div>
          </div>
        </div>
        <div className='ml-auto mt-2 w-1/6'>
          <ButtonComponent type='submit' children='更新' />
        </div>
      </form>
    </ModalComponent>
  );
};
