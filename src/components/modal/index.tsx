import React from 'react';
import { atom, useRecoilState } from 'recoil';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import { flexAlignCenter } from 'styles/containers';
import { Heading4, Body4 } from 'styles/typography';
import color from 'styles/colors';
import Button, { ButtonKind } from './button';

const Wrap = styled.div`
  width: ${pxToVw(326)};
  min-height: auto;
  padding: 40px 24px 24px;
  flex-direction: column;
  border-radius: 16px;
  box-sizing: border-box;

  ${mediaQuery(640)} {
    width: 326px;
    padding: 40px 24px 24px;
  }
`;

const Title = styled(Heading4)`
  margin-bottom: ${pxToVw(16)};

  ${mediaQuery(640)} {
    margin-bottom: 16px;
  }
`;

const Body = styled(Body4)`
  text-align: center;
  color: ${color.grayscale.gray02};
`;

const ButtonWrap = styled.div`
  ${flexAlignCenter}
  margin-top: ${pxToVw(24)};
  width: 100%;

  ${mediaQuery(640)} {
    margin-top: 24px;
  }
`;

const SadImg = styled.div`
  width: ${pxToVw(120)};
  height: ${pxToVw(82)};
  background: url('/images/img_sad.svg') center no-repeat;
  background-size: contain;
  margin-bottom: ${pxToVw(16)};

  ${mediaQuery(640)} {
    width: 120px;
    height: 82px;
    margin-bottom: 16px;
  }
`;

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

export const modalState = atom({
  key: 'modalState',
  default: {
    type: '',
    isOpen: false,
    title: '',
    body: '',
    leftButton: { label: '취소', onClick: () => {} },
    rightButton: { label: '확인', onClick: () => {} }
  }
});

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);
  const handleClose = () =>
    setModal({
      type: '',
      isOpen: false,
      title: '',
      body: '',
      leftButton: { label: '취소', onClick: () => {} },
      rightButton: { label: '확인', onClick: () => {} }
    });

  return (
    <ReactModal
      isOpen={modal.isOpen}
      onRequestClose={handleClose}
      className="ignore-default-style"
      style={modalStyle}
      shouldCloseOnOverlayClick
    >
      <Wrap style={modalStyle.content}>
        {modal.type === 'withdraw' && <SadImg />}
        <Title>{modal.title}</Title>
        <Body>{modal.body}</Body>
        <ButtonWrap>
          <Button
            kind={ButtonKind.Secondary}
            onClick={() => {
              modal.leftButton.onClick();
              handleClose();
            }}
          >
            {modal?.leftButton?.label}
          </Button>
          <Button
            onClick={() => {
              modal.rightButton.onClick();
              handleClose();
            }}
          >
            {modal?.rightButton?.label}
          </Button>
        </ButtonWrap>
      </Wrap>
    </ReactModal>
  );
}
