import { FormEvent, MouseEvent, useCallback } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { ButtonWithIconComponent } from '@/components/atoms/ButtonWithIconComponent';
import { useDeleteConfirmModalComponent } from '@/hooks/useDeleteConfirmModalComponent';
import { useDeletePlanMutation } from '@/redux/plan/slice';

type Props = {
  size: number;
  planId: number;
};

export const DeletePlanButtonComponent = (props: Props) => {
  const [deletePlan] = useDeletePlanMutation();
  const title = '削除の確認';
  const { renderDeleteModal, confirmDelete } = useDeleteConfirmModalComponent();
  const handleDeleteSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      // これを入れているのは、リロードが走らないようにするため
      event.preventDefault();
      const { accepted } = await confirmDelete({ title });
      if (!accepted) return;

      deletePlan({ id: props.planId });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [confirmDelete, props.planId],
  );

  // NOTE: これを入れているのは、予定更新モーダルが開いてしまわないようにするため
  const handleClick = (event: MouseEvent<HTMLFormElement>) => event.stopPropagation();

  return (
    <>
      {renderDeleteModal()}
      <form id={`delete-plan-${props.planId}-form`} onSubmit={handleDeleteSubmit} onClick={handleClick}>
        <ButtonWithIconComponent
          type='submit'
          icon={<MdOutlineDeleteForever />}
          size={props.size}
        ></ButtonWithIconComponent>
      </form>
    </>
  );
};
