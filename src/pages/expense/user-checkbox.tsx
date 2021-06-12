import React, { useState } from 'react';
import styled from '@emotion/styled';
import Profile, { ProfileProps } from 'components/profile';
import CheckBox from 'components/check-box';
import { flexAlignCenter } from 'styles/containers';
import { useRecoilState } from 'recoil';
import { expenseAssigneeState } from './expense-state';

const Wrap = styled.div`
  ${flexAlignCenter};
  justify-content: space-between;
  margin-bottom: 4px;
`;

interface CheckboxProps extends ProfileProps {
  userId: number;
}

export default function UserCheckbox({ userId, nickName, type, isMe }: CheckboxProps) {
  const [assignee, setAssignee] = useRecoilState(expenseAssigneeState);
  const [isChecked, setIsChecked] = useState(true);

  const handleClick = (id: number) => {
    setIsChecked(!isChecked);
    const restMembers = assignee.members.filter((member) => member.userId !== id);
    const stateChangedMember = [{ userId: id, isAssigned: !isChecked }];
    setAssignee({ members: [...restMembers, ...stateChangedMember] });
    console.log(assignee);
  };
  return (
    <Wrap>
      <Profile nickName={nickName} type={type} isMe={isMe} hasName />
      <CheckBox userId={userId} checked={isChecked} handleClick={() => handleClick(userId)} />
    </Wrap>
  );
}
