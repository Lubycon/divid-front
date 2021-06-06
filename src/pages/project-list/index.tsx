import React from 'react';
import { basicWrap } from 'styles/containers';
import styled from '@emotion/styled';
import { Heading4 } from 'styles/typography';
import { Animals } from 'api/types';
import { TripCard } from 'model/trip';
import { useGetTripLists } from 'hooks/data/useTripInfo';
import Empty from './empty';
import Card from './card';
import Welcome from './hello-message';

const DUMMY: TripCard[] = [
  {
    tripId: '244ba584-099d-4eb3-954e-0766132ac9e1',
    tripName: '강원도 우정여행',
    startDate: '2021-05-25',
    endDate: '2021-06-30',
    memberCnt: 2,
    end: false,
    userInfoResponseList: [
      { userId: 2, nickName: '지형', profile: Animals.Bear, me: true },
      { userId: 3, nickName: '주예', profile: Animals.Unicorn, me: false }
    ]
  },
  {
    tripId: '244ba584-099d-4eb3-954e-0766132ac9e2',
    tripName: '제주도여행',
    startDate: '2021-05-13',
    endDate: '2021-05-19',
    memberCnt: 2,
    end: true,
    userInfoResponseList: [
      { userId: 2, nickName: '지형', profile: Animals.Bear, me: true },
      { userId: 4, nickName: '유진', profile: Animals.Rabbit, me: false }
    ]
  }
];

const Title = styled(Heading4)`
  margin: 16px 0;
`;

export default function ProjectList() {
  const currentTrip = DUMMY.filter((trip) => !trip.end);
  const pastTrip = DUMMY.filter((trip) => trip.end);

  const { data } = useGetTripLists();
  console.log(data);

  if (DUMMY.length === 0) {
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
      {currentTrip.length > 0 ? (
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
      {pastTrip.length > 0 ? (
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
