import { FormEvent } from 'react';
import { ButtonComponent } from '@/components//atoms/ButtonComponent';
import { formatToYYYY_MM_DD } from '@/helpers/dateHelper';
import { errorHandler } from '@/helpers/errorHandlerHelper';
import { useBackToListMutation } from '@/redux/plan/slice';

export const BackToListButtonComponent = () => {
  const [backToList] = useBackToListMutation();

  const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    const now = new Date();
    try {
      await backToList({ date: formatToYYYY_MM_DD(now) })
        .unwrap()
        .catch(errorHandler);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form id={`back-to-list-form`} onSubmit={handleCreateSubmit}>
      <ButtonComponent type='submit' children='スケジュール内のTODOをTODO一覧に戻す' />
    </form>
  );
};
