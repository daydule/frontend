import { useDeletePlanMutation } from '@/redux/plan/slice';
import { FormEvent, MouseEvent } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { ButtonWithIconComponent } from '@/components/atoms/ButtonWithIconComponent';

type Props = {
  size: number;
  planId: number;
};

export const DeletePlanButtonComponent = (props: Props) => {
  const [deletePlan] = useDeletePlanMutation();

  const handleDeleteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // これを入れているのは、リロードが走らないようにするため
    event.preventDefault();
    deletePlan({ id: props.planId });
  };

  // NOTE: これを入れているのは、予定更新モーダルが開いてしまわないようにするため
  const handleClick = (event: MouseEvent<HTMLFormElement>) => event.stopPropagation();

  return (
    <form id={`delete-plan-${props.planId}-form`} onSubmit={handleDeleteSubmit} onClick={handleClick}>
      <ButtonWithIconComponent
        type='submit'
        icon={<MdOutlineDeleteForever />}
        size={props.size}
      ></ButtonWithIconComponent>
    </form>
  );
};
