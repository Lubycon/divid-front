import React from 'react';
import styled from '@emotion/styled';
import Profile, { ProfileProps } from 'components/profile';
import CheckBox from 'components/check-box';
import { flexAlignCenter } from 'styles/containers';

const Wrap = styled.div`
  ${flexAlignCenter};
  justify-content: space-between;
  margin-bottom: 4px;
`;

export default function UserCheckbox({ name, type, isMe }: ProfileProps) {
  return (
    <Wrap>
      <Profile name={name} type={type} isMe={isMe} hasName />
      <CheckBox />
    </Wrap>
  );
}
