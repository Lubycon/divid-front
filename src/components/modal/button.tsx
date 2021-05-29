import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { Heading7 } from 'styles/typography';
import { mediaQuery, pxToVw } from 'styles/media';

const Button = styled.button<{ kind: ButtonKind }>`
  background-color: ${({ kind }) => (kind === ButtonKind.Primary ? color.primary : color.grayscale.gray06)};
  margin-left: ${({ kind }) => (kind === ButtonKind.Primary ? pxToVw(8) : 0)};
  border-radius: 8px;
  outline: none;
  border: none;
  height: ${pxToVw(48)};
  width: 100%;

  p {
    color: ${({ kind }) => (kind === ButtonKind.Primary ? color.white : color.grayscale.gray01)};
  }

  ${mediaQuery(640)} {
    margin-left: ${({ kind }) => (kind === ButtonKind.Primary ? 8 : 0)}px;
    height: 48px;
  }
`;

export enum ButtonKind {
  Primary = 'primary',
  Secondary = 'secondary'
}

interface ModalButtonProps {
  kind?: ButtonKind;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function ModalButton({ kind = ButtonKind.Primary, onClick, children = '확인' }: ModalButtonProps) {
  return (
    <Button kind={kind} onClick={onClick}>
      <Heading7>{children}</Heading7>
    </Button>
  );
}
