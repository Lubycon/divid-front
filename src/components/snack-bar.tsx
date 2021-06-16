import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
import { flexCenter } from 'styles/containers';

interface SnackBarProps {
  children?: React.ReactNode;
  isOpen: boolean;
}

const SnackBarWrap = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 24px;
  width: ${pxToVw(327)};
  height: ${pxToVw(60)};
  z-index: 1000;
  background: ${color.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 9px;
  ${flexCenter};
  box-sizing: border-box;

  ${mediaQuery(640)} {
    width: 592px;
    height: 60px;
    bottom: 60px;
    justify-content: flex-start;
    padding: 0 20px;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: fadeInOut 3s;
        `
      : css`
          display: none;
        `};
`;

export default function SnackBar({ children, isOpen }: SnackBarProps) {
  return <SnackBarWrap isOpen={isOpen}>{children}</SnackBarWrap>;
}
