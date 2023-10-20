import { FormEvent, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { SimpleInputComponent } from '../../../common/leaf/SimpleInputComponent';
import { TimePickerComponent } from '../../../common/leaf/TimePickerComponent';
import { RegisterPlanModalComponent } from './RegisterPlanModalComponent';
import { ButtonComponent } from '@/components/common/tree/ButtonComponent';
import { CONSTANT } from '@/constant/default';
import { formatDateToTimeString4digits, formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { CreateForm, useCreatePlanMutation } from '@/redux/plan/slice';

export const RegisterPlanComponent = () => {
  // 開始時間を現在の時間から直後の15分刻みのキリのいい時間に設定
  const defaultStartDate = new Date();
  const minutes = defaultStartDate.getMinutes();
  const remainder = minutes % 15;
  defaultStartDate.setMinutes(minutes + (15 - remainder));
  // 終了時間を開始時間から１時間後の時間に設定
  const defaultProcessTime = CONSTANT.DEFAULT.PLAN.REGISTER_PLAN.PROCESS_TIME;
  const defaultEndDate = new Date(defaultStartDate.getTime());
  defaultEndDate.setHours(defaultStartDate.getHours() + defaultProcessTime / 60);

  const [title, setTitle] = useState<string>(CONSTANT.DEFAULT.PLAN.TITLE);
  const [startTime, setStartTime] = useState<Date>(defaultStartDate);
  const [endTime, setEndTime] = useState<Date>(defaultEndDate);
  const [hiddenProcessTime, setHiddenProcessTime] = useState<number>(defaultProcessTime);

  const [createPlan] = useCreatePlanMutation();

  const [showsModal, setShowsModal] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const data: CreateForm = {
      title: title,
      date: formatToYYYY_MM_DD(new Date()),
      startTime: formatDateToTimeString4digits(startTime),
      endTime: formatDateToTimeString4digits(endTime),
      isRequiredPlan: CONSTANT.DEFAULT.PLAN.IS_REQUIRED_PLAN,
      priority: CONSTANT.DEFAULT.PLAN.PRIORITY,
      planType: CONSTANT.DEFAULT.PLAN.PLAN_TYPE.PLAN,
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

  // NOTE: 開始時間変更時に所要時間を保って終了時間も変更する
  const handleChangeStartTime = (newStartTime: Date) => {
    const newEndTime = new Date(newStartTime.getTime());
    newEndTime.setHours(newEndTime.getHours() + Math.floor(hiddenProcessTime / 60));
    newEndTime.setMinutes(newEndTime.getMinutes() + (hiddenProcessTime % 60));
    setEndTime(newEndTime);
  };

  /**
   * NOTE:
   * 終了時間が開始時間より後のままの場合は、
   * 保持している所要時間だけ変更する
   * 終了時間が開始時間と等しい もしくは 開始時間より前になった場合は、
   * 所要時間を保って開始時間も変更する
   */
  const handleChangeEndTime = (newEndTime: Date) => {
    if (newEndTime.getTime() > startTime.getTime()) {
      const newProcessTime =
        (newEndTime.getHours() - startTime.getHours()) * 60 + (newEndTime.getMinutes() - startTime.getMinutes());
      setHiddenProcessTime(newProcessTime);
    } else {
      const newStartTime = new Date(newEndTime.getTime());
      newStartTime.setHours(newStartTime.getHours() - Math.floor(hiddenProcessTime / 60));
      newStartTime.setMinutes(newStartTime.getMinutes() - (hiddenProcessTime % 60));
      setStartTime(newStartTime);
    }
  };

  const handleClickOption = () => {
    setShowsModal(true);
  };

  const handleClose = () => {
    setShowsModal(false);
  };

  return (
    <div className='relative my-4 h-[calc(25%_-_1rem)] w-96 rounded-md border border-gray-200 shadow-md'>
      <div className='absolute left-3 top-3 text-xl'>予定</div>
      <form className='mt-3' id='register-plan-form' onSubmit={handleSubmit}>
        <div className='mx-auto w-3/5'>
          <SimpleInputComponent
            id='title'
            name='title'
            type='text'
            placeholder='タイトル'
            value={title}
            setter={setTitle}
          />
        </div>
        <div className='mx-auto mt-2 flex h-1/6 w-3/5 items-center'>
          <div className='z-20 mr-2 w-5/6'>
            <TimePickerComponent
              id='startTime'
              name='startTime'
              header='開始'
              value={startTime}
              setter={setStartTime}
              onChange={handleChangeStartTime}
              extraClassName='h-4/5 pl-3 rounded-lg border-gray-200'
            />
          </div>
          <div>〜</div>
          <div className='z-20 ml-2 w-5/6'>
            <TimePickerComponent
              id='endTime'
              name='endTime'
              header='終了'
              value={endTime}
              setter={setEndTime}
              onChange={handleChangeEndTime}
              extraClassName='h-4/5 pl-3 rounded-lg border-gray-200'
            />
          </div>
        </div>
        <div className='absolute bottom-3 left-3'>
          <ButtonComponent
            extraClassName='bg-white hover:bg-gray-300 text-gray-500'
            type='button'
            children='その他のオプション'
            handleClick={handleClickOption}
          />
        </div>
        <div className='absolute bottom-3 right-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-indigo-700 text-white shadow-[0px_0px_1px_1px_rgba(0,0,0,0.3)] hover:bg-indigo-600'>
            <button type='submit'>
              <IoMdAdd size={40} />
            </button>
          </div>

          {/* <ButtonComponent type='submit' children='登録' /> */}
        </div>
      </form>
      {showsModal && (
        <RegisterPlanModalComponent
          showsModal={showsModal}
          handleClose={handleClose}
          title={title}
          setTitle={setTitle}
          startTime={startTime}
          setStartTime={setStartTime}
          onChangeStartTime={handleChangeStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onChangeEndTime={handleChangeEndTime}
        />
      )}
    </div>
  );
};
