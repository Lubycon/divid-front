import React from 'react';
import styled from '@emotion/styled';
import { Heading4 } from 'styles/typography';
import { flexAlignCenter } from 'styles/containers';
import color from 'styles/colors';
import Profile, { IconSize, Animals } from '../profile';

const Wrap = styled.div`
  ${flexAlignCenter}
  padding: 90px 0 32px 24px;
`;

const Title = styled(Heading4)`
  margin-left: 8px;

  span {
    color: ${color.primary};
  }
`;

export default function Welcome() {
  return (
    <Wrap>
      <Profile iconSize={IconSize.LG} type={Animals.Hamster} />
      <Title>
        <span>주예</span>님
        <br />
        안녕하세요!
      </Title>
    </Wrap>
  );
}
