import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import { flexAlignCenter } from 'styles/containers';
import { Heading4, Body4 } from 'styles/typography';
import color from 'styles/colors';
import Button, { ButtonTheme } from './button';

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

interface ModalButton {
  label?: string;
  handleClick?: () => void;
}

interface ButtonModalProps {
  type?: string;
  title: string;
  body: string;
  buttons: {
    left: ModalButton;
    right: ModalButton;
  };
  closeModal?: () => void;
}

export default function ButtonModal({ type, title, body, buttons, closeModal }: ButtonModalProps) {
  return (
    <Wrap style={modalStyle.content}>
      {type === 'withdraw' && <SadImg />}
      <Title>{title}</Title>
      <Body>{body}</Body>
      <ButtonWrap>
        <Button
          theme={ButtonTheme.Secondary}
          onClick={() => {
            buttons.left.handleClick?.();
            closeModal?.();
          }}
        >
          {buttons.left.label || '취소'}
        </Button>
        <Button
          onClick={() => {
            buttons.right.handleClick?.();
            closeModal?.();
          }}
        >
          {buttons.right.label || '확인'}
        </Button>
      </ButtonWrap>
    </Wrap>
  );
}
