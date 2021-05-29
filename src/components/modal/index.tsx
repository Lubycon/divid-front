import React from 'react';
import ReactModal from 'react-modal';

export const modalStyle = {
  content: {
    outline: 'none',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)'
  },
  overlay: {
    zIndex: 2000000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

ReactModal.setAppElement('body');

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function Modal({ children, isOpen, onRequestClose }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="ignore-default-style"
      style={modalStyle}
      shouldCloseOnOverlayClick
    >
      {children}
    </ReactModal>
  );
}
