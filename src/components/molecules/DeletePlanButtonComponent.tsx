import { useDeletePlanMutation } from '@/redux/plan/slice';
import { FormEvent } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { ButtonWithIconComponent } from '@/components/atoms/ButtonWithIconComponent';

type Props = {
  size: number;
  planId: number;
};

export const DeletePlanButtonComponent = (props: Props) => {
  const [deletePlan] = useDeletePlanMutation();

  const handleDeleteSubmit = async (event: FormEvent<HTMLFormElement>, id: number) => {
    // リロードが走らないように入れている
    event.preventDefault();
    deletePlan({ id });
  };

  return (
    <form id={`delete-plan-${props.planId}-form`} onSubmit={(event) => handleDeleteSubmit(event, props.planId)}>
      <ButtonWithIconComponent
        type='submit'
        icon={<MdOutlineDeleteForever />}
        size={props.size}
      ></ButtonWithIconComponent>
    </form>
  );
};
