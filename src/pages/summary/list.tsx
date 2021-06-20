import React from 'react';
import styled from '@emotion/styled';
import { Animals } from 'api/types';
import Profile from 'components/profile';
import { Heading7 } from 'styles/typography';
import color from 'styles/colors';
import { flexAlignCenter } from 'styles/containers';
import { numberWithCommas } from 'utils';

const Wrap = styled.div`
  ${flexAlignCenter};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Text = styled(Heading7)`
  color: ${color.grayscale.gray01};
  margin-left: 4px;
`;

const Point = styled.span<{ kind: string }>`
  color: ${({ kind }) => (kind === 'give' ? color.red : color.green)};
  font-weight: 800;
`;

interface ListProps {
  nickName: string;
  profile: Animals;
  kind: string;
  amount: number;
}

export default function List({ nickName, profile, amount, kind }: ListProps) {
  return (
    <Wrap>
      <Profile type={profile} />
      <Text>
        {nickName} 님에게 <Point kind={kind}>{numberWithCommas(amount)}원</Point> {kind === 'GIVE' ? '주기' : '받기'}
      </Text>
    </Wrap>
  );
}
