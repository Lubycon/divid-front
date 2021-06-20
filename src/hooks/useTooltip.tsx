import React, { useCallback, useState } from 'react';
import Modal from 'components/modal/tooltip';
import { setLocalStorage } from 'utils';

interface ChildProps {
  onClose: () => void;
}
interface UseTooltip {
  children: React.ReactElement<ChildProps>;
  type: string;
}

export default function useTooltip({ children, type }: UseTooltip) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setLocalStorage(type, new Date().toDateString());
    setIsOpen(false);
  }, []);

  const renderModal = () => (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      {children}
    </Modal>
  );

  return {
    handleOpen,
    handleClose,
    renderModal
  };
}
