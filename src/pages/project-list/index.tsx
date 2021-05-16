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

const Title = styled(Heading4)`
  margin: 16px 0;
`;

export default function ProjectList() {
  if (DUMMY.length === 0) {
    return <Empty />;
  }

  return (
    <div css={basicWrap}>
      {DUMMY.length !== 0 ? <Title>여행 중</Title> : null}
      {DUMMY.length !== 0 && DUMMY.map
        ? DUMMY.map(({ name, startDate, endDate, memberCount, give, take }) => (
            <Card
              name={name}
              startDate={startDate}
              endDate={endDate}
              memberCount={memberCount}
              giveMoneyAmount={give}
              takeMoneyAmount={take}
              isCurrent
            />
          ))
        : null}
      {DUMMY.length !== 0 ? <Title>모든 여행</Title> : null}
      {DUMMY.length !== 0 && DUMMY.map
        ? DUMMY.map(({ name, startDate, endDate, memberCount, give, take }) => (
            <Card
              name={name}
              startDate={startDate}
              endDate={endDate}
              memberCount={memberCount}
              giveMoneyAmount={give}
              takeMoneyAmount={take}
            />
          ))
        : null}
    </div>
  );
}
