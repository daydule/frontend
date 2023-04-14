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
  const defaultProcessTime = CONSTANT.DEFAULT.PLAN.REGISTER.PROCESS_TIME;
  const defaultEndDate = new Date(defaultStartDate.getTime());
  defaultEndDate.setHours(defaultStartDate.getHours() + defaultProcessTime / 60);

  const [title, setTitle] = useState<string>(CONSTANT.DEFAULT.PLAN.TITLE);
  const [startTime, setStartTime] = useState<Date>(defaultStartDate);
  const [endTime, setEndTime] = useState<Date>(defaultEndDate);
  const [processTime, setProcessTime] = useState<number>(defaultProcessTime);
  const [createPlan] = useCreatePlanMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // リロードが走らないように入れている
    event.preventDefault();
    const data: CreateForm = {
      title: title,
      date: formatToYYYY_MM_DD(new Date()),
      startTime: formatToTimeString4digits(startTime),
      endTime: formatToTimeString4digits(endTime),
      priority: CONSTANT.DEFAULT.PLAN.PLAN_TYPE.PLAN,
      planType: CONSTANT.DEFAULT.PLAN.PRIORITY,
    };
    try {
      await createPlan(data).unwrap();
      setTitle(CONSTANT.DEFAULT.PLAN.TITLE);
    } catch (e) {
      console.error(e);
    }
  };

  // NOTE: 開始時間変更時に所要時間を保って終了時間も変更する
  const onChangeStartTime = (newStartTime: Date) => {
    const newEndTime = new Date(newStartTime.getTime());
    newEndTime.setHours(newEndTime.getHours() + Math.floor(processTime / 60));
    newEndTime.setMinutes(newEndTime.getMinutes() + (processTime % 60));
    setEndTime(newEndTime);
  };

  /**
   * NOTE:
   * 終了時間が開始時間より後のままの場合は、
   * 保持している所要時間だけ変更する
   * 終了時間が開始時間と等しい もしくは 開始時間より前になった場合は、
   * 所要時間を保って開始時間も変更する
   */
  const onChangeEndTime = (newEndTime: Date) => {
    if (newEndTime.getTime() > startTime.getTime()) {
      const newProcessTime = Math.floor(newEndTime.getTime() - startTime.getTime()) / (60 * 1000);
      setProcessTime(newProcessTime);
    } else {
      const newStartTime = new Date(newEndTime.getTime());
      newStartTime.setHours(newStartTime.getHours() - Math.floor(processTime / 60));
      newStartTime.setMinutes(newStartTime.getMinutes() - (processTime % 60));
      setStartTime(newStartTime);
    }
  };

  return (
    <div className='border border-gray-200 shadow-md rounded-md w-96 h-[calc(25%_-_1rem)] my-4 relative'>
      <div className='absolute top-3 left-3 text-xl'>予定</div>
      <form className='mt-3' id='register-plan-form' onSubmit={handleSubmit}>
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
        <div className='mt-2 mx-auto h-1/6 w-3/5 flex items-center'>
          <div className='mr-2 w-5/6'>
            <TimePickerComponent
              id='startTime'
              name='startTime'
              header='開始'
              value={startTime}
              setter={setStartTime}
              onChange={onChangeStartTime}
              extraClassName='h-4/5 pl-3 rounded-lg border-gray-200'
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
              onChange={onChangeEndTime}
              extraClassName='h-4/5 pl-3 rounded-lg border-gray-200'
            />
          </div>
        </div>
        <div className='absolute bottom-3 right-16 text-md'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='その他のオプション'
            onClick={() => {}}
          />
        </div>
        <div className='absolute bottom-3 right-3 text-md'>
          <ButtonComponent type='submit' children='登録' />
        </div>
      </form>
    </div>
  );
};
