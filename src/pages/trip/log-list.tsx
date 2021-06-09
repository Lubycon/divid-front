import React from 'react';
import { useGetExpenseAll } from 'hooks/data/useExpense';
import styled from '@emotion/styled';
import { Animals } from 'api/types';
import Log from './log';

const Wrap = styled.div`
  margin-top: 24px;
`;
interface Dummy {
  id: number;
  expender: string;
  profile: Animals;
  amount: number;
  desc: string;
  date: string;
}

const DUMMY: Dummy[] = [
  { id: 1, expender: '지형', profile: Animals.Puppy, amount: 20000, desc: '휴게소', date: '2021-04-16' },
  { id: 2, expender: '주예', profile: Animals.Hamster, amount: 8000, desc: '아메리카노', date: '2021-04-16' },
  { id: 3, expender: '유진', profile: Animals.Rabbit, amount: 180000, desc: '게스트하우스', date: '2021-04-16' },
  { id: 4, expender: '유진', profile: Animals.Rabbit, amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 5, expender: '유진', profile: Animals.Rabbit, amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 6, expender: '유진', profile: Animals.Unicorn, amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 7, expender: '유진', profile: Animals.Rabbit, amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 8, expender: '유진', profile: Animals.Bear, amount: 180000, desc: '게스트하우스', date: '2021-04-15' },
  { id: 9, expender: '유진', profile: Animals.Rabbit, amount: 180000, desc: '게스트하우스', date: '2021-04-15' }
];

export default function LogList({ tripId }: { tripId: string }) {
  const { data, isLoading } = useGetExpenseAll(tripId);

  if (isLoading || !data) {
    <div>loading</div>;
  }

  console.log(data);
  return (
    <Wrap>
      {DUMMY.length !== 0 &&
        DUMMY.map &&
        DUMMY.map(({ id, expender, profile, amount, desc }) => (
          <Log key={id} expender={expender} profile={profile} amount={amount} desc={desc} />
        ))}
    </Wrap>
  );
}
