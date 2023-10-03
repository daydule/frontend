import { ReactNode, useCallback, useState } from 'react';

import DeleteConfirmModalComponent, {
  DeleteConfirmModalComponentProps,
} from '@/components/pages/main/tree/DeleteConfirmModalComponent';

type State = {
  title: string;
  onClose: DeleteConfirmModalComponentProps['onClose'];
};

type OpenModalResult = Parameters<State['onClose']>[0];

type ReturnValues = {
  confirmDelete: (props: Omit<State, 'onClose'>) => Promise<OpenModalResult>;
  renderDeleteModal: () => ReactNode;
};

export const useDeleteConfirmModalComponent = (subMessage?: string): ReturnValues => {
  const [state, setState] = useState<State | undefined>(undefined);

  const confirmDelete: ReturnValues['confirmDelete'] = useCallback(
    (props) =>
      new Promise((resolve) => {
        setState({ ...props, onClose: resolve });
      }),
    [],
  );

  const handleClose: State['onClose'] = useCallback(
    (options) => {
      state?.onClose(options);
      setState(undefined);
    },
    [state],
  );

  const renderDeleteModal: ReturnValues['renderDeleteModal'] = () => {
    return (
      <DeleteConfirmModalComponent
        showsModal={!!state}
        title={state?.title ?? ''}
        onClose={handleClose}
        subMessage={subMessage}
      />
    );
  };

  return {
    confirmDelete,
    renderDeleteModal,
  };
};
