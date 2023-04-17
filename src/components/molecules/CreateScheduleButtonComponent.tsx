import { FormEvent } from 'react';
import { ButtonComponent } from '@/components//atoms/ButtonComponent';
import { useCreateScheduleMutation } from '@/redux/schedule/slice';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';

export const CreateScheduleButtonComponent = () => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // リロードが走らないように入れている
    event.preventDefault();
    const now = new Date();
    const dateString = formatToYYYY_MM_DD(now);
    await createSchedule({ date: dateString });
  };

  return (
    <form id={`create-schedule-form`} onSubmit={handleCreateSubmit}>
      <ButtonComponent type='submit' children={'TODOを予定に入れる'} />
    </form>
  );
};
