import React from 'react';
import styled from '@emotion/styled';
import { useCheckDesktop } from 'utils';
import { SerializedStyles } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import ReactModal from 'react-modal';
import color from 'styles/colors';
import { Heading7 } from 'styles/typography';

const Contents = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  ${mediaQuery(640)} {
    width: 640px;
  }
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

ReactModal.setAppElement('body');

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function TooltipModal({ children, isOpen, onRequestClose }: ModalProps) {
  const isDesktop = useCheckDesktop();

  const modalStyle = {
    content: {
      height: '100%',
      width: isDesktop ? '640px' : '100%',
      outline: 'none'
    },
    overlay: {
      zIndex: 2000000,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      transition: 'opacity 0.3s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="ignore-default-style"
      style={modalStyle}
      shouldCloseOnOverlayClick
    >
      <Contents onClick={onRequestClose}>{children}</Contents>
    </ReactModal>
  );
}

interface TooltipProps {
  text: string;
  position: SerializedStyles;
  trianglePosition: number;
}

const Wrap = styled.div`
  position: absolute;
  background: ${color.primary};
  width: ${pxToVw(327)};
  height: ${pxToVw(60)};
  box-shadow: 0px 4px 16px rgba(88, 90, 241, 0.2);
  border-radius: 8px;

  ${mediaQuery(640)} {
    width: 327px;
    height: 60px;
  }
`;

const LabelWrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 ${pxToVw(16)};
  display: flex;
  align-items: center;
  position: relative;
  position: absolute;

  ${mediaQuery(640)} {
    padding: 0 16px;
  }
`;

const Triangle = styled.div<{ position: number }>`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  background: url('/images/tooltip_rectangle.svg') no-repeat center;
  background-size: contain;
  position: absolute;
  top: ${pxToVw(-16)};
  right: ${({ position }) => pxToVw(position)};

  ${mediaQuery(640)} {
    width: 20px;
    height: 20px;
    top: -16px;
    right: ${({ position }) => position}px;
  }
`;

export function Tooltip({ text, position, trianglePosition }: TooltipProps) {
  return (
    <Wrap css={position}>
      <LabelWrap>
        <Triangle position={trianglePosition} />
        <Label>{text}</Label>
      </LabelWrap>
    </Wrap>
  );
}
