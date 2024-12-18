import * as Dialog from '@radix-ui/react-dialog';
import s from './dialog-modal.module.scss';
import clsx from 'clsx';

type DialogModalProps = {
  description: string;
  confirmButtonText: string;
  rejectButtonText: string;
  onConfirm: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  className?: string;
};

export const DialogModal = ({
  showModal,
  setShowModal,
  description,
  confirmButtonText,
  rejectButtonText,
  onConfirm,
  className,
}: DialogModalProps) => {
  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={clsx(s.dialogContent, className)}>
          <Dialog.Title className={s.dialogTitle}> </Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <div className={s.dialogButtonContainer}>
            <Dialog.Close onClick={onConfirm}>{confirmButtonText}</Dialog.Close>
            <Dialog.Close>{rejectButtonText}</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
