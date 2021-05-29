import React, { useCallback, useState, cloneElement } from 'react';
import Modal from 'components/modal';

interface ChildProps {
  closeModal: () => void;
}
interface UseModal {
  children: React.ReactElement<ChildProps>;
}

export default function useModal({ children }: UseModal) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderModal = () => (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      {cloneElement(children, {
        closeModal: handleClose
      })}
    </Modal>
  );

  return {
    handleOpen,
    handleClose,
    renderModal
  };
}
