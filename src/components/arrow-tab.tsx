import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import { flexAlignCenter } from 'styles/containers';
import { Heading7 } from 'styles/typography';
import { ArrowRight } from 'styles/icon';

const Tab = styled.div<{ isBorderTop: boolean }>`
  ${flexAlignCenter};
  justify-content: space-between;
  height: ${pxToVw(60)};
  border-top: ${({ isBorderTop }) => (isBorderTop ? `1px solid ${color.grayscale.gray06}` : 0)};

  ${mediaQuery(640)} {
    height: 60px;
  }
`;

interface ArrowTabProps {
  onClick?: () => void;
  label: string;
  isBorderTop?: boolean;
}

export default function ArrowTab({ onClick, label, isBorderTop = false }: ArrowTabProps) {
  return (
    <Tab onClick={onClick ?? onClick} isBorderTop={isBorderTop}>
      <Heading7>{label}</Heading7>
      <ArrowRight theme={color.grayscale.gray03} />
    </Tab>
  );
}
