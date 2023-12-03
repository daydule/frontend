import { FormEvent, useState } from 'react';
import { CheckBoxComponent } from '../../../common/leaf/CheckBoxComponent';
import { SimpleInputComponent } from '../../../common/leaf/SimpleInputComponent';
import { TextAreaComponent } from '../../../common/leaf/TextAreaComponent';
import { TimePickerComponent } from '../../../common/leaf/TimePickerComponent';
import { ButtonComponent } from '../../../common/tree/ButtonComponent';
import { ModalComponent } from '@/components/common/tree/ModalComponent';
import { CONSTANT } from '@/constant/default';
import { convertToDate, convertDateToTimeString4digits, convertToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { UpdateForm, useUpdatePlanMutation } from '@/redux/plan/slice';
import { Plan } from '@/redux/types';

type Props = {
  showsModal: boolean;
  handleClose: () => void;
  plan: Plan;
};

export const UpdatePlanModalComponent = (props: Props) => {
  const [title, setTitle] = useState<string>(props.plan.title);
  const defaultStartDate = convertToDate(props.plan.startTime);
  const [startTime, setStartTime] = useState<Date>(defaultStartDate);
  const defaultEndDate = convertToDate(props.plan.endTime);
  const [endTime, setEndTime] = useState<Date>(defaultEndDate);
  const defaultProcessTime = Math.floor(defaultEndDate.getTime() - defaultStartDate.getTime()) / (60 * 1000);
  const [hiddenProcessTime, setHiddenProcessTime] = useState<number>(defaultProcessTime);
  const [context, setContext] = useState<string>(props.plan.context);
  const [place, setPlace] = useState<string>(props.plan.place);
  const [isRequiredPlan, setIsRequiredPlan] = useState<boolean>(props.plan.isRequiredPlan);

  const [updatePlan] = useUpdatePlanMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const data: UpdateForm = {
      id: Number(props.plan.id),
      title: title,
      date: convertToYYYY_MM_DD(new Date(props.plan.date)),
      startTime: convertDateToTimeString4digits(startTime),
      endTime: convertDateToTimeString4digits(endTime),
      context: context === null ? undefined : context,
      place: place === null ? undefined : place,
      isRequiredPlan: isRequiredPlan,
      priority: CONSTANT.DEFAULT.PLAN.PRIORITY,
      planType: CONSTANT.DEFAULT.PLAN.PLAN_TYPE.PLAN,
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

  return (
    <ModalComponent isOpen={props.showsModal} onClose={props.handleClose} title='予定'>
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
              <div className='mr-2 w-5/6'>
                <TimePickerComponent
                  id='startTime'
                  name='startTime'
                  header='開始'
                  value={startTime}
                  setter={setStartTime}
                  onChange={handleChangeStartTime}
                  extraClassName='h-4/5 pl-3 rounded-lg border-gray-200 z-10'
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
                  onChange={handleChangeEndTime}
                  extraClassName='h-4/5 pl-3 rounded-lg border-gray-200'
                />
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
            <div className='mx-auto mt-8 w-4/5'>
              <CheckBoxComponent
                id='required-plan'
                name='required-plan'
                title='この予定よりTODOを優先する'
                value={!isRequiredPlan}
                labelLocation='right'
                handleChange={() => setIsRequiredPlan(!isRequiredPlan)}
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
