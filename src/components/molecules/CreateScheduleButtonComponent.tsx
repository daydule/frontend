import { FormEvent, useState } from 'react';
import { TooltipComponent } from '../atoms/ToolTipComponent';
import { RegisterSchedulingOptionsModalComponent } from './RegisterSchedulingOptionsModalComponent';
import { ButtonWithOptionComponent } from '@/components/atoms/ButtonWithOptionComponent';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useCreateScheduleMutation } from '@/redux/schedule/slice';

export const CreateScheduleButtonComponent = () => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const now = new Date();
    const dateString = formatToYYYY_MM_DD(now);
    const currentTime = ('00' + now.getHours()).slice(-2) + ('00' + now.getMinutes()).slice(-2);
    try {
      await createSchedule({ date: dateString, currentTime: currentTime }).unwrap().catch(errorHandler);
    } catch (e) {
      console.log(e);
    }
  };
  const [showsModal, setShowsModal] = useState<boolean>(false);

  const handleClickOption = () => {
    setShowsModal(true);
  };

  const handleClose = () => {
    setShowsModal(false);
  };

  return (
    <TooltipComponent
      content='TODO一覧にあるTODOをスケジュールに入れます。できるだけTODOの時間を分割しないように入れ込みます。'
      extraClassName='bottom-10 w-96 left-0'
    >
      <form id={`create-schedule-form`} onSubmit={handleCreateSubmit}>
        <ButtonWithOptionComponent
          typeForMainButton='submit'
          typeForOptionButton={'button'}
          handleClickOption={handleClickOption}
        >
          TODOを予定に変換
        </ButtonWithOptionComponent>
      </form>
      {showsModal && <RegisterSchedulingOptionsModalComponent showsModal={showsModal} handleClose={handleClose} />}
    </TooltipComponent>
  );
};
