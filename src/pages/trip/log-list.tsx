import React from 'react';
import styled from '@emotion/styled';
import Graph from 'components/graph';
import { GiveNTakeAmountProps } from 'components/graph';
import { Animals } from 'components/profile';
import Log from './log';

interface Dummy {
  id: number;
  expender: string;
  profile: keyof typeof Animals;
  amount: number;
  desc: string;
  date: string;
}

const DUMMY: Dummy[] = [
  { id: 1, expender: '지형', profile: 'Puppy', amount: 20000, desc: '휴게소', date: '2021-04-16' },
  { id: 2, expender: '주예', profile: 'Hamster', amount: 8000, desc: '아메리카노', date: '2021-04-16' },
  { id: 3, expender: '유진', profile: 'Rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-16' },
  { id: 4, expender: '유진', profile: 'Rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 5, expender: '유진', profile: 'Rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 6, expender: '유진', profile: 'Unicorn', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 7, expender: '유진', profile: 'Rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 8, expender: '유진', profile: 'Bear', amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 9, expender: '유진', profile: 'Rabbit', amount: 180000, desc: '게스트하우스', date: '2021-04-15' }
];

const Wrap = styled.div`
  margin-top: 24px;
`;

export default function LogList({ giveMoneyAmount, takeMoneyAmount }: GiveNTakeAmountProps) {
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
