import { FormEvent } from 'react';
import { ButtonComponent } from '@/components//atoms/ButtonComponent';
import { useBackToListMutation } from '@/redux/plan/slice';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';

export const BackToListButtonComponent = () => {
  const [backToList] = useBackToListMutation();

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // リロードが走らないように入れている
    event.preventDefault();
    const now = new Date();
    await backToList({ date: formatToYYYY_MM_DD(now) });
  };

  return (
    <form id={`back-to-list-form`} onSubmit={handleCreateSubmit}>
      <ButtonComponent type='submit' children={'back to list'} />
    </form>
  );
};
