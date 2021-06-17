import React from 'react';
import styled from '@emotion/styled';

import { basicWrap } from 'styles/containers';
import { Heading3, Heading7, Body4 } from 'styles/typography';
import { Animals } from 'components/profile';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import Button from 'components/button';
import List from './list';

const Title = styled(Heading3)`
  margin: 8px 0;

  span {
    color: ${color.primary};
  }
`;

const Desc = styled(Body4)`
  color: ${color.grayscale.gray01};
`;

const DetailWrap = styled.div`
  background: ${color.white};
  border-radius: 16px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  padding: 24px 16px;
  margin: ${pxToVw(139)} 0 ${pxToVw(16)};
  position: relative;

  ${mediaQuery(640)} {
    margin: 170px 0 24px;
  }
`;

const CharSummary = styled.div`
  width: ${pxToVw(166)};
  height: ${pxToVw(126)};
  background: url('/images/img_calculation_detail.svg') no-repeat center;
  background-size: contain;
  position: absolute;
  top: ${pxToVw(-115)};
  left: ${pxToVw(80)};

  ${mediaQuery(640)} {
    width: 220px;
    height: 152px;
    top: -139px;
    left: 198px;
  }
`;

const NoList = styled(Heading7)`
  color: ${color.grayscale.gray01};
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

interface DummyProps {
  id: number;
  nickName: string;
  profile: Animals;
  kind: string;
  amount: number;
}

const Dummy: DummyProps[] = [
  { id: 1, nickName: '지형', profile: Animals.Puppy, kind: 'give', amount: 50000 },
  { id: 2, nickName: '영진', profile: Animals.Unicorn, kind: 'take', amount: 50000 }
];

export default function Summary() {
  return (
    <div css={basicWrap}>
      <Title>
        <span>주예</span> 님의 정산 내역
      </Title>
      <Desc>카드를 누르면 자세한 내역을 볼 수 있어요.</Desc>
      <DetailWrap>
        <CharSummary />
        <NoList>주고 받을 내역이 없어요.</NoList>
        {Dummy &&
          Dummy.map(({ nickName, profile, kind, amount }) => (
            <List nickName={nickName} profile={profile} kind={kind} amount={amount} />
          ))}
      </DetailWrap>
      <Button>
        <Label>정산 내역 공유</Label>
      </Button>
    </div>
  );
}
