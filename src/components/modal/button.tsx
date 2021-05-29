import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { Heading7 as Label } from 'styles/typography';
import { mediaQuery, pxToVw } from 'styles/media';

const Button = styled.button<{ theme: ButtonTheme }>`
  background-color: ${({ theme }) => (theme === ButtonTheme.Primary ? color.primary : color.grayscale.gray06)};
  margin-left: ${({ theme }) => (theme === ButtonTheme.Primary ? pxToVw(8) : 0)};
  border-radius: 8px;
  outline: none;
  border: none;
  height: ${pxToVw(48)};
  width: 100%;

  p {
    color: ${({ theme }) => (theme === ButtonTheme.Primary ? color.white : color.grayscale.gray01)};
  }

  ${mediaQuery(640)} {
    margin-left: ${({ theme }) => (theme === ButtonTheme.Primary ? 8 : 0)}px;
    height: 48px;
  }
`;

export enum ButtonTheme {
  Primary = 'primary',
  Secondary = 'secondary'
}

interface ModalButtonProps {
  theme?: ButtonTheme;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function ModalButton({ theme = ButtonTheme.Primary, onClick, children = '확인' }: ModalButtonProps) {
  return (
    <Button theme={theme} onClick={onClick}>
      <Label>{children}</Label>
    </Button>
  );
}
