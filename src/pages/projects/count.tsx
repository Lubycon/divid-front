import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Badge, Heading5 as Point, CaptionBold } from 'styles/typography';
import color from 'styles/colors';
import { useNumberWithCommas } from 'utils';

export enum GiveOrTake {
  Give = 'give',
  Take = 'take'
}

interface CountProps {
  type: GiveOrTake;
  amount: number;
}

const conditionalGap = css`
  &:nth-child(2) {
    margin-left: 17px;
  }
`;

const PriceWrap = styled.div<{ isGive: boolean }>`
  display: flex;
  align-items: center;

  color: ${({ isGive }) => (isGive ? color.red : color.green)};
`;

const Icon = styled.div<{ isGive: boolean }>`
  width: 12px;
  height: 12px;
  ${({ isGive }) =>
    isGive
      ? css`
          background: url('./images/ico_give.png') center no-repeat;
        `
      : css`
          background: url('./images/ico_take.png') center no-repeat;
        `}
  background-size: contain;
  margin-right: 7px;
`;

export default function Count({ type, amount }: CountProps) {
  const isGive = type === GiveOrTake.Give;

  return (
    <div css={conditionalGap}>
      <Badge
        css={css`
          color: ${color.grayscale.gray03};
        `}
      >
        {isGive ? '줄 돈' : '받을 돈'}
      </Badge>
      <PriceWrap isGive={isGive}>
        <Icon isGive={isGive} />
        <Point>{useNumberWithCommas(amount)}</Point>
        <CaptionBold>원</CaptionBold>
      </PriceWrap>
    </div>
  );
}
