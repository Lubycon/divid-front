import React, { useCallback, useState, isValidElement, cloneElement } from 'react';
import Modal from 'components/modal';

interface UseModal {
  children: React.ReactNode;
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
      {isValidElement(children)
        ? cloneElement(children, {
            closeModal: handleClose
          })
        : children}
    </Modal>
  );

  return {
    handleOpen,
    handleClose,
    renderModal
  };
}
