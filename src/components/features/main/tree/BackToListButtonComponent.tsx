import { FormEvent } from 'react';
import { TfiBackLeft } from 'react-icons/tfi';
import { ButtonWithIconComponent } from '../../../common/leaf/ButtonWithIconComponent';
import { TooltipComponent } from '../../../common/tree/ToolTipComponent';
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
      <TooltipComponent content='スケジュール内のTODOをTODO一覧に戻す' extraClassName='w-48'>
        <ButtonWithIconComponent type='submit' icon={<TfiBackLeft />} size={3} extraClassName='text-indigo-700' />
      </TooltipComponent>
    </form>
  );
};
