import { FormEvent } from 'react';
import { ButtonComponent } from '@/components//atoms/ButtonComponent';
import { useCreateScheduleMutation } from '@/redux/schedule/slice';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';

export const CreateScheduleButtonComponent = () => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const now = new Date();
    const dateString = formatToYYYY_MM_DD(now);
    const currentTime = ('00' + now.getHours()).slice(-2) + ('00' + now.getMinutes()).slice(-2);
    await createSchedule({ date: dateString, currentTime: currentTime });
  };

  return (
    <form id={`create-schedule-form`} onSubmit={handleCreateSubmit}>
      <ButtonComponent type='submit' children={'TODOを予定に入れる'} />
    </form>
  );
};
