import React from 'react';
import Button, { ButtonType } from 'components/button';
import { DetailTripInfo } from 'model/trip';

import styled from '@emotion/styled';
import Graph from 'components/graph';
import { Heading6, Caption } from 'styles/typography';
import color from 'styles/colors';
import Empty from './empty';
import LogList from './log-list';

const SummaryContainer = styled.div`
  width: 100%;
  background-color: ${color.white};
  padding: 24px 16px 20px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 25px;
  position: relative;
  margin-top: 23px;

  button {
    position: absolute;
    right: 16px;
    top: 24px;
  }
`;

const Title = styled(Heading6)`
  margin-bottom: 18px;
`;

const Label = styled(Caption)`
  color: ${color.grayscale.gray03};
  margin-right: 1px;
`;

const ButtonIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/images/arrow_right.svg') center no-repeat;
  background-size: contain;
`;

const GraphWrap = styled.div`
  margin-top: 19px;
`;

export default function TripLog({ trip, tripId }: { trip: DetailTripInfo; tripId: string }) {
  const giveMoneyAmount = trip.amountResponse.giveAmount;
  const takeMoneyAmount = trip.amountResponse.takeAmount;

  return (
    <>
      {!giveMoneyAmount && !takeMoneyAmount ? (
        <Empty memberCount={trip.userInfoResponseList.length} />
      ) : (
        <>
          <SummaryContainer>
            <Title>내 정산내역</Title>
            <Button buttonType={ButtonType.Text}>
              <>
                <Label>더보기</Label>
                <ButtonIcon />
              </>
            </Button>
            <GraphWrap>
              <Graph giveMoneyAmount={giveMoneyAmount} takeMoneyAmount={takeMoneyAmount} />
            </GraphWrap>
          </SummaryContainer>
          <LogList tripId={tripId} />
        </>
      )}
    </>
  );
}
