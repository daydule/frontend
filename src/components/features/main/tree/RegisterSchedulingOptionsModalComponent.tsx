import { FormEvent, useState } from 'react';
import { TimePickerComponent } from '../../../common/leaf/TimePickerComponent';
import { ButtonComponent } from '../../../common/tree/ButtonComponent';
import { InfoIconComponent } from '../../../common/tree/InfoIconComponent';
import { ModalComponent } from '@/components/common/tree/ModalComponent';
import { convertToDate, convertDateToTimeString4digits, convertToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import {
  scheduleRecordUpdateForm,
  useReadScheduleQuery,
  useUpdateScheduleRecordMutation,
} from '@/redux/schedule/slice';

type Props = {
  showsModal: boolean;
  handleClose: () => void;
};

export const RegisterSchedulingOptionsModalComponent = (props: Props) => {
  const now = new Date();
  const dateString = convertToYYYY_MM_DD(now);
  const { data: scheduleReadResult } = useReadScheduleQuery({ date: dateString });
  const [updateScheduleRecord] = useUpdateScheduleRecordMutation();

  if (!scheduleReadResult) return <></>;

  const [startTime, setStartTime] = useState<Date>(convertToDate(scheduleReadResult.schedule.startTime));
  const [endTime, setEndTime] = useState<Date>(convertToDate(scheduleReadResult.schedule.endTime));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const data: scheduleRecordUpdateForm = {
      date: dateString,
      startTime: convertDateToTimeString4digits(startTime),
      endTime: convertDateToTimeString4digits(endTime),
    };
    try {
      await updateScheduleRecord(data)
        .unwrap()
        .then(() => props.handleClose())
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalComponent isOpen={props.showsModal} onClose={props.handleClose} title='TODOを予定にする際のオプション'>
      <form className='mt-3' id='register-scheduling-options-form' onSubmit={handleSubmit}>
        <div className='flex items-center'>
          <div className='ml-8'>作業する時間帯</div>
          <InfoIconComponent
            content='「作業する時間帯」とは「あなたがTODOを実行できる時間帯」のことです。'
            extraClassName='ml-2'
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
              extraClassName='h-4/5 pl-3 rounded-lg border-gray-200'
            />
          </div>
        </div>
        <div className='ml-auto mt-2 w-1/6'>
          <ButtonComponent type='submit' children='更新' />
        </div>
      </form>
    </ModalComponent>
  );
};
