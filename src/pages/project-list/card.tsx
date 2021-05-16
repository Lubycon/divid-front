import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { changeStringToDate, makeDateFormat } from 'utils';
import { Heading4 as Title, Heading7 as Desc } from 'styles/typography';
import color from 'styles/colors';
import Count, { GiveOrTake } from './count';

const CardWrap = styled.div<{ isCurrent: boolean }>`
  width: 100%;
  margin-bottom: 16px;
  border: ${({ isCurrent }) => (isCurrent ? `2px solid ${color.primary}` : `1px solid ${color.grayscale.gray05}`)};
  border-radius: 8px;
  padding: 24px 16px;
  box-sizing: border-box;
`;

const More = styled.div`
  width: 24px;
  height: 24px;
  background: url('./images/ico_more.png') center no-repeat;
  background-size: contain;
`;

interface CardProps {
  name: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  giveMoneyAmount: number;
  takeMoneyAmount: number;
  isCurrent?: boolean;
}

export default function Card({
  name,
  startDate,
  endDate,
  memberCount,
  giveMoneyAmount,
  takeMoneyAmount,
  isCurrent = false
}: CardProps) {
  const sDate = changeStringToDate(startDate);
  const eDate = changeStringToDate(endDate);

  return (
    <CardWrap isCurrent={isCurrent}>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Title>{name}</Title>
        <More />
      </div>
      <Desc
        css={css`
          color: ${color.grayscale.gray02};
          margin-bottom: 32px;
        `}
      >
        {`${makeDateFormat(sDate)} - ${makeDateFormat(eDate)}, ${memberCount}명`}
      </Desc>
      <div
        css={css`
          display: flex;
        `}
      >
        {takeMoneyAmount ? <Count type={GiveOrTake.Take} amount={takeMoneyAmount} /> : null}
        {giveMoneyAmount ? <Count type={GiveOrTake.Give} amount={giveMoneyAmount} /> : null}
      </div>
    </CardWrap>
  );
}
