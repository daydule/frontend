import { useCallback } from 'react';
import { ButtonComponent } from '../../../common/tree/ButtonComponent';
import { ModalComponent } from '@/components/common/tree/ModalComponent';

export type DeleteConfirmModalComponentProps = {
  showsModal: boolean;
  title: string;
  onClose: (options: { accepted: boolean }) => void;
  subMessage?: string;
};

const DeleteConfirmModalComponent: React.FC<DeleteConfirmModalComponentProps> = ({
  showsModal,
  title,
  onClose,
  subMessage,
}) => {
  const handleCancel = useCallback(() => {
    onClose({ accepted: false });
  }, [onClose]);

  const handleAccept = useCallback(() => {
    onClose({ accepted: true });
  }, [onClose]);

  return (
    <>
      {showsModal && (
        <ModalComponent
          isOpen={showsModal}
          onClose={() => {
            handleCancel();
          }}
          title={title}
        >
          <div className='mt-5 text-left text-2xl'>本当に削除していいですか？</div>
          {subMessage && <div className='mt-5 text-left text-base'>{subMessage}</div>}
          <div className='mt-10 grid grid-cols-5 gap-5'>
            <div className='col-start-4 col-end-4'>
              <ButtonComponent
                type='submit'
                children='キャンセル'
                extraClassName='border-2 border-stone-500 bg-stone-50 text-stone-600 hover:bg-stone-300'
                handleClick={handleCancel}
              />
            </div>
            <div className='col-start-5 col-end-5'>
              <ButtonComponent type='submit' children='OK' handleClick={handleAccept} />
            </div>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default DeleteConfirmModalComponent;
