import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { flexCenter } from 'styles/containers';

const Button = styled.a`
  position: fixed;
  ${flexCenter};
  width: 72px;
  height: 72px;
  border-radius: 100%;
  background-color: ${color.primary};
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.16);

  &:hover {
    opacity: 0.7;
  }
`;

const Plus = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url('/images/plus.svg') no-repeat center;
  background-size: contain;
`;

export default function FloatingActionButton() {
  return (
    <Button>
      <Plus />
    </Button>
  );
}
