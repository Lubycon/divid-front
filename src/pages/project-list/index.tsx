import React from 'react';
import { basicWrap } from 'styles/containers';
import styled from '@emotion/styled';
import { Heading4 } from 'styles/typography';
import { useGetTripLists } from 'hooks/data/useTripInfo';
import Loading from 'pages/loading';
import Empty from './empty';
import Card from './card';
import Welcome from './hello-message';

const Title = styled(Heading4)`
  margin: 16px 0;
`;

export default function ProjectList() {
  const { data, isLoading } = useGetTripLists();
  const currentTrip = data?.filter((trip) => !trip.end);
  const pastTrip = data?.filter((trip) => trip.end);

  console.log(data);

  if (isLoading) {
    <Loading />;
  }

  if (!isLoading && data && data.length === 0) {
    return (
      <div css={basicWrap}>
        <Welcome />
        <Empty />
      </div>
    );
  }

  return (
    <div css={basicWrap}>
      <Welcome />
      {currentTrip && currentTrip.length > 0 ? (
        <>
          <Title>여행 중</Title>
          {currentTrip.map(({ tripId, tripName, startDate, endDate, memberCnt, userInfoResponseList, end }) => (
            <Card
              key={tripId}
              tripId={tripId}
              tripName={tripName}
              startDate={startDate}
              endDate={endDate}
              memberCnt={memberCnt}
              members={userInfoResponseList}
              isCurrent={!end}
            />
          ))}
        </>
      ) : null}
      {pastTrip && pastTrip.length > 0 ? (
        <>
          <Title>모든 여행</Title>
          {pastTrip.map(({ tripId, tripName, startDate, endDate, memberCnt, userInfoResponseList, end }) => (
            <Card
              key={tripId}
              tripId={tripId}
              tripName={tripName}
              startDate={startDate}
              endDate={endDate}
              memberCnt={memberCnt}
              members={userInfoResponseList}
              isCurrent={!end}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
