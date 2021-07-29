import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { DetailTripInfo } from 'model/trip';
import { mediaQuery, pxToVw } from 'styles/media';
import FloatingActionButton from 'components/floating-action-button';
import color from 'styles/colors';
import Summary from './summary';
import Empty from './empty';
import LogList from './log-list';

const Divider = styled.div`
  width: 100vw;
  height: ${pxToVw(10)};
  background: ${color.white};
  margin-left: ${pxToVw(-24)};

  ${mediaQuery(640)} {
    height: 10px;
    width: 640px;
    margin-left: -24px;
  }
`;

export default function TripLog({ trip, tripId }: { trip: DetailTripInfo; tripId: string }) {
  const giveMoneyAmount = trip.amountResponse.giveAmount;
  const takeMoneyAmount = trip.amountResponse.takeAmount;
  const memberCount = trip.userInfoResponseList.length;

  const handleClickFab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (memberCount < 2) {
      e.preventDefault();
    }
  };

  return (
    <>
      {!giveMoneyAmount && !takeMoneyAmount ? (
        <Empty memberCount={memberCount} />
      ) : (
        <>
          <Summary />
          <Divider />
          <LogList tripId={tripId} />
        </>
      )}
      <Link to={memberCount < 2 ? '#none' : `/expense?tripId=${tripId}`} onClick={handleClickFab}>
        <FloatingActionButton disabled={memberCount < 2} />
      </Link>
    </>
  );
}
