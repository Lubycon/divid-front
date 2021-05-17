import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { numberWithCommas, calcRate } from 'utils';
import { Badge as CommonBadge, Heading5 } from 'styles/typography';

export interface GiveNTakeAmountProps {
  giveMoneyAmount: number;
  takeMoneyAmount: number;
}

const GraphContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
`;

const ColorBar = styled.div<{ percent: number; type: LogType }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background-color: ${({ type }) => (type === LogType.Give ? color.red : color.green)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Badge = styled(CommonBadge)`
  color: ${color.grayscale.gray06};
  margin-bottom: 4px;
`;

const Amount = styled(Heading5)`
  color: ${color.grayscale.gray06};
  line-height: 1;
`;

enum LogType {
  Give = 'give',
  Take = 'take'
}

export default function Graph({ giveMoneyAmount, takeMoneyAmount }: GiveNTakeAmountProps) {
  const totalAmount = giveMoneyAmount + takeMoneyAmount;
  const giveMoneyPercent = calcRate(giveMoneyAmount, totalAmount);
  const takeMoneyPercent = calcRate(takeMoneyAmount, totalAmount);

  return (
    <GraphContainer>
      {giveMoneyAmount !== 0 && (
        <ColorBar type={LogType.Give} percent={giveMoneyPercent}>
          <Badge>갚을 돈</Badge>
          <Amount>{numberWithCommas(giveMoneyAmount)}</Amount>
        </ColorBar>
      )}
      {takeMoneyAmount !== 0 && (
        <ColorBar type={LogType.Take} percent={takeMoneyPercent}>
          <Badge>받을 돈</Badge>
          <Amount>{numberWithCommas(takeMoneyAmount)}</Amount>
        </ColorBar>
      )}
    </GraphContainer>
  );
}
