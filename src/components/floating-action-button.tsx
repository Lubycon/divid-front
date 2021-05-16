import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';

const Wrap = styled.div`
  position: fixed;
  width: 72px;
  height: 72px;
  border-radius: 100%;
  background-color: ${color.primary};
  bottom: 32px;
  left: calc(50% - 40px);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.16);
`;

export default function FloatingActionButton() {
  return <Wrap />;
}
