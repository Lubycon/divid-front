import React from 'react';
import { basicWrap } from 'styles/containers';
import styled from '@emotion/styled';
import { Heading4 } from 'styles/typography';
import Empty from './empty';
import Card from './card';

const DUMMY = [
  {
    id: 1,
    name: '강원도 우정여행',
    startDate: '2021-05-13',
    endDate: '2021-05-13',
    memberCount: 1,
    give: 20000,
    take: 400000
  }
];

const DUMMY2 = [];

const Title = styled(Heading4)`
  margin: 16px 0;
`;

export default function Projects() {
  if (DUMMY2.length) {
    return <Empty />;
  }
  return (
    <div css={basicWrap}>
      <Title>여행 중</Title>
      {DUMMY.length && DUMMY.map
        ? DUMMY.map(({ name, startDate, endDate, memberCount, give, take }) => (
            <Card
              name={name}
              startDate={startDate}
              endDate={endDate}
              memberCount={memberCount}
              give={give}
              take={take}
              isCurrent
            />
          ))
        : null}
      {DUMMY.length ? <Title>모든 여행</Title> : null}
      {DUMMY.length && DUMMY.map
        ? DUMMY.map(({ name, startDate, endDate, memberCount, give, take }) => (
            <Card
              name={name}
              startDate={startDate}
              endDate={endDate}
              memberCount={memberCount}
              give={give}
              take={take}
            />
          ))
        : null}
    </div>
  );
}
