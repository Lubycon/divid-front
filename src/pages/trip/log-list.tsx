import React from 'react';
import styled from '@emotion/styled';
import Graph from 'components/graph';
import { GiveNTakeAmountProps } from 'components/graph';
import { Animals } from 'api/types';
import { Heading6, Caption } from 'styles/typography';
import color from 'styles/colors';
import Button, { ButtonType } from 'components/button';
import Log from './log';

const SummaryContainer = styled.div`
  width: 100%;
  background-color: ${color.white};
  padding: 24px 16px 20px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 25px;
  position: relative;

  button {
    position: absolute;
    right: 16px;
    top: 24px;
  }
`;

const Title = styled(Heading6)`
  margin-bottom: 18px;
`;

const Wrap = styled.div`
  margin-top: 24px;
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

export default function LogList({ giveMoneyAmount, takeMoneyAmount }: GiveNTakeAmountProps) {
  return (
    <Wrap>
      <SummaryContainer>
        <Title>내 정산내역</Title>
        <Button buttonType={ButtonType.Text}>
          <>
            <Label>더보기</Label>
            <ButtonIcon />
          </>
        </Button>
        <Graph giveMoneyAmount={giveMoneyAmount} takeMoneyAmount={takeMoneyAmount} />
      </SummaryContainer>
      {DUMMY.length !== 0 &&
        DUMMY.map &&
        DUMMY.map(({ id, expender, profile, amount, desc }) => (
          <Log key={id} expender={expender} profile={profile} amount={amount} desc={desc} />
        ))}
    </Wrap>
  );
}
