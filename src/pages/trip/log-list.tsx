import React from 'react';
import styled from '@emotion/styled';
import Graph from 'components/graph';
import Log from './log';

const DUMMY = [
  { id: 1, expender: '지형', profile: 'puppy', amount: 20000, desc: '휴게소', date: '2021-04-16' },
  { id: 2, expender: '주예', profile: 'hamster', amount: 8000, desc: '아메리카노', date: '2021-04-16' },
  { id: 3, expender: '유진', profile: 'rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-16' },
  { id: 4, expender: '유진', profile: 'rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 5, expender: '유진', profile: 'rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 6, expender: '유진', profile: 'unicorn', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 7, expender: '유진', profile: 'rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 8, expender: '유진', profile: 'bear', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 9, expender: '유진', profile: 'rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' }
];

const Wrap = styled.div`
  margin-top: 24px;
`;

interface LogListProps {
  giveMoneyAmount: number;
  takeMoneyAmount: number;
}

export default function LogList({ giveMoneyAmount, takeMoneyAmount }: LogListProps) {
  return (
    <Wrap>
      <Graph giveMoneyAmount={giveMoneyAmount} takeMoneyAmount={takeMoneyAmount} />
      {DUMMY.length !== 0 &&
        DUMMY.map &&
        DUMMY.map(({ id, expender, profile, amount, desc }) => (
          <Log key={id} expender={expender} profile={profile} amount={amount} desc={desc} />
        ))}
    </Wrap>
  );
}
