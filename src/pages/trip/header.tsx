import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { Heading3, Body3 } from 'styles/typography';
import { changeStringToDate, makeDateFormat } from 'utils';
import { TripInfo } from 'model/trip';

import Members from 'components/members';

const Title = styled(Heading3)`
  line-height: 1;
`;

const Desc = styled(Body3)`
  color: ${color.grayscale.gray02};
  margin-top: 8px;
`;

export default function Header({ trip }: { trip: TripInfo }) {
  const sDate = changeStringToDate(trip.startDate);
  const eDate = changeStringToDate(trip.endDate);

  return (
    <>
      <Title>{trip.tripName}</Title>
      <Desc>{`${makeDateFormat(sDate)} - ${makeDateFormat(eDate)}`}</Desc>
      <Members inviteCode={trip.inviteCode} members={trip.userInfoResponseList} />
    </>
  );
}
