import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Profile, { ProfileProps } from 'components/profile';
import { flexAlignCenter } from 'styles/containers';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import { useRecoilState } from 'recoil';
import { expenseState, expenseAssigneeState, AssigneeInfo } from './expense-state';

const Wrap = styled.div`
  ${flexAlignCenter};
  justify-content: space-between;
  margin-bottom: 4px;
`;

interface CheckboxProps extends ProfileProps {
  userId: number;
  handleExpenseDetail: () => void;
}

const PriceInput = styled.input`
  width: 82px;
  height: 30px;
  border: none;
  border-bottom: 1px solid ${color.grayscale.gray05};
  text-align: right;
  box-sizing: border-box;
  font-size: ${pxToVw(18)};
  line-height: 1.5;
  background: transparent;

  ${mediaQuery(640)} {
    font-size: 18px;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${color.black};
  }

  &::placeholder {
    color: ${color.grayscale.gray01};
    font-size: ${pxToVw(18)};
    line-height: 1.5;
    opacity: 0.3;

    ${mediaQuery(640)} {
      font-size: 18px;
    }
  }
`;

export default function IndividualInput({ userId, nickName, type, isMe, handleExpenseDetail }: CheckboxProps) {
  const [initialPrice, setInitialPrice] = useState<number | null>(null);
  const [newExpense] = useRecoilState(expenseState);
  const [assignee, setAssignee] = useRecoilState(expenseAssigneeState);

  useEffect(() => {
    if (newExpense.totalPrice !== 0) {
      const divided = newExpense.totalPrice / assignee.members.length;
      console.log(divided);
      setInitialPrice(divided);
      const restMembers = assignee.members.filter((member) => member.userId !== userId);
      const stateChangedMember: AssigneeInfo[] = [{ userId, price: divided }];
      setAssignee({ members: [...restMembers, ...stateChangedMember] });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    e.target.value = e.target.value.replace(/[^0-9]/, '');
    const price = Number(e.target.value);
    const restMembers = assignee.members.filter((member) => member.userId !== id);
    const stateChangedMember: AssigneeInfo[] = [{ userId: id, price }];
    setAssignee({ members: [...restMembers, ...stateChangedMember] });

    e.target.value = e.target.value.replace(/[^0-9 ,]/, '');
    console.log(assignee);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = '';
  };

  return (
    <Wrap>
      <Profile nickName={nickName} type={type} isMe={isMe} hasName />
      <PriceInput
        type="text"
        placeholder="금액입력"
        defaultValue={initialPrice ?? ''}
        onChange={(e) => {
          handleChange(e, userId);
          handleExpenseDetail();
        }}
        onFocus={handleFocus}
      />
    </Wrap>
  );
}
