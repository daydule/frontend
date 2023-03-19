import { ButtonComponent } from '@/components/atoms/ButtonComponent';
import { CONSTANT } from '@/config/const';
import { formatToTimeString4digits, formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';
import { FormEvent, useState } from 'react';
import { SimpleInputComponent } from '../atoms/SimpleInputComponent';
import { TimePickerComponent } from '../atoms/TimePickerComponent';

export const RegisterPlanComponent = () => {
  // 開始時間を現在の時間から直後の15分刻みのキリのいい時間に設定
  const defaultStartDate = new Date();
  const minutes = defaultStartDate.getMinutes();
  const remainder = minutes % 15;
  defaultStartDate.setMinutes(minutes + (15 - remainder));
  // 終了時間を開始時間から１時間後の時間に設定
  const defaultEndDate = new Date(defaultStartDate.getTime());
  defaultEndDate.setHours(defaultStartDate.getHours() + 1);

  const [title, setTitle] = useState<string>(CONSTANT.DEFAULT.PLAN.TITLE);
  const [startTime, setStartTime] = useState<Date>(defaultStartDate);
  const [endTime, setEndTime] = useState<Date>(defaultEndDate);
  const [createPlan] = useCreatePlanMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // リロードが走らないように入れている
    event.preventDefault();
    const data: CreateForm = {
      title: title,
      date: formatToYYYY_MM_DD(new Date()),
      startTime: formatToTimeString4digits(startTime),
      endTime: formatToTimeString4digits(endTime),
      priority: 0,
      planType: 0,
    };
    try {
      await createPlan(data).unwrap();
      setTitle(CONSTANT.DEFAULT.PLAN.TITLE);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className='border border-black rounded-md w-96 h-[calc(25%_-_1rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>予定</div>
      <form id='register-plan-form' onSubmit={handleSubmit}>
        <div className='mt-10 mx-auto w-3/5'>
          <SimpleInputComponent<string>
            id='title'
            name='title'
            type='text'
            placeholder='タイトル'
            value={title}
            setter={setTitle}
          />
        </div>
        <div className='mt-2 mx-auto h-1/6 w-3/5 flex items-center'>
          <div className='mr-2 w-5/6'>
            <TimePickerComponent
              id='startTime'
              name='startTime'
              header='開始'
              value={startTime}
              setter={setStartTime}
              extraClassName='h-4/5 pl-3 rounded-lg border-gray-400'
            />
          </div>
          <div>〜</div>
          <div className='ml-2 w-5/6'>
            <TimePickerComponent
              id='endTime'
              name='endTime'
              header='終了'
              value={endTime}
              setter={setEndTime}
              extraClassName='h-4/5 pl-3 rounded-lg border-gray-400'
            />
          </div>
        </div>
        <div className='absolute bottom-3 right-3 text-xl'>
          <ButtonComponent type='submit' children='登録' />
        </div>
      </form>
    </div>
  );
};
