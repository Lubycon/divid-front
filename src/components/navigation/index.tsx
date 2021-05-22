import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import color from 'styles/colors';
import Welcome from './welcome';

const Wrap = styled.div`
  background: ${color.white};
  height: 100vh;
  width: 262px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;

const Border = styled.div`
  width: 232px;
  height: 1px;
  background: ${color.grayscale.gray06};
`;

export const naviStyle = {
  content: {
    outline: 'none',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  overlay: {
    zIndex: 2000000,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    transition: 'opacity 0.3s'
  }
};

interface NavigationProps {
  isNaviOpened: boolean;
  onRequestClose: () => void;
}

ReactModal.setAppElement('body');

export default function Navigation({ isNaviOpened, onRequestClose }: NavigationProps) {
  return (
    <ReactModal
      isOpen={isNaviOpened}
      onRequestClose={onRequestClose}
      style={naviStyle}
      className="ignore-default-style"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick
    >
      <Wrap>
        <Welcome />
        <Border />
      </Wrap>
    </ReactModal>
  );
}
