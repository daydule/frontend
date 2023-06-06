import { FormEvent, useState } from 'react';
import { useCreateScheduleMutation } from '@/redux/schedule/slice';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { ButtonWithOptionComponent } from '@/components/atoms/ButtonWithOptionComponent';
import { RegisterSchedulingOptionsModalComponent } from './RegisterSchedulingOptionsModalComponent';

export const CreateScheduleButtonComponent = () => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const now = new Date();
    const dateString = formatToYYYY_MM_DD(now);
    const currentTime = ('00' + now.getHours()).slice(-2) + ('00' + now.getMinutes()).slice(-2);
    try {
      await createSchedule({ date: dateString, currentTime: currentTime });
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
    <>
      <form id={`create-schedule-form`} onSubmit={handleCreateSubmit}>
        <ButtonWithOptionComponent
          typeForMainButton='submit'
          children={'TODOを予定にする'}
          extraClassName='w-52'
          typeForOptionButton={'button'}
          handleClickOption={handleClickOption}
        />
      </form>
      {showsModal && <RegisterSchedulingOptionsModalComponent showsModal={showsModal} handleClose={handleClose} />}
    </>
  );
};
