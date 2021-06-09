import React, { useState } from 'react';
import styled from '@emotion/styled';
import Profile, { ProfileProps } from 'components/profile';
import CheckBox from 'components/check-box';
import { flexAlignCenter } from 'styles/containers';

const Wrap = styled.div`
  ${flexAlignCenter};
  justify-content: space-between;
  margin-bottom: 4px;
`;

interface CheckboxProps extends ProfileProps {
  userId: number;
}

export default function UserCheckbox({ userId, nickName, type, isMe }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <Wrap>
      <Profile nickName={nickName} type={type} isMe={isMe} hasName />
      <CheckBox userId={userId} checked={isChecked} handleClick={() => setIsChecked(!isChecked)} />
    </Wrap>
  );
}
