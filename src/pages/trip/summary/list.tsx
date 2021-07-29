import React from 'react';
import styled from '@emotion/styled';
import { GiveOrTake } from 'model/expense';
import { Animals } from 'api/types';
import Profile from 'components/profile';
import { Heading7, Badge } from 'styles/typography';
import color from 'styles/colors';
import { flexAlignCenter } from 'styles/containers';
import { numberWithCommas } from 'utils';

const Wrap = styled.div`
  ${flexAlignCenter};
  justify-content: space-between;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Text = styled(Heading7)`
  color: ${color.grayscale.gray01};
  margin-left: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Point = styled.span<{ kind: GiveOrTake }>`
  color: ${({ kind }) => (kind === GiveOrTake.Give ? color.red : color.green)};
  font-weight: 800;
`;

interface ListProps {
  nickName: string;
  profile: Animals;
  kind: GiveOrTake;
  amount: number;
}

export default function List({ nickName, profile, amount, kind }: ListProps) {
  return (
    <Wrap>
      <Profile type={profile} nickName={nickName} hasName />
      <Text>
        <Point kind={kind}>{numberWithCommas(amount)}원</Point>
        <Badge>{kind === 'GIVE' ? '주기' : '받기'}</Badge>
      </Text>
    </Wrap>
  );
}
