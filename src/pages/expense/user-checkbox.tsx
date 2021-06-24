import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Profile, { ProfileProps } from 'components/profile';
import CheckBox from 'components/check-box';
import { flexAlignCenter } from 'styles/containers';
import { useRecoilState } from 'recoil';
import { expenseState } from './expense-state';

const Wrap = styled.div`
  ${flexAlignCenter};
  justify-content: space-between;
  margin-bottom: 4px;
`;

interface CheckboxProps extends ProfileProps {
  userId: number;
}

export default function UserCheckbox({ userId, nickName, type, isMe }: CheckboxProps) {
  const [newExpense, setNewExpense] = useRecoilState(expenseState);
  const [isChecked, setIsChecked] = useState<boolean | null>(null);

  useEffect(() => {
    const individualExpense = newExpense.expenseDetails.filter((el) => el.userId === userId);
    if (!individualExpense.length) {
      setIsChecked(false);
      return;
    }
    setIsChecked(true);
  }, []);

  const handleClick = (id: number, checked: boolean) => {
    setIsChecked(checked);
    if (!checked) {
      const updateInfo = newExpense.expenseDetails
        .filter((el) => el.userId !== id)
        .map((el) => ({ userId: el.userId, price: newExpense.totalPrice / (newExpense.expenseDetails.length - 1) }));
      setNewExpense({ ...newExpense, expenseDetails: updateInfo });
      return;
    }
    const updateInfo = newExpense.expenseDetails.map((el) => ({
      userId: el.userId,
      price: newExpense.totalPrice / (newExpense.expenseDetails.length - 1)
    }));
    setNewExpense({
      ...newExpense,
      expenseDetails: [...updateInfo, { userId, price: newExpense.totalPrice / (newExpense.expenseDetails.length + 1) }]
    });
  };

  console.log(isChecked);

  return (
    <Wrap>
      <Profile nickName={nickName} type={type} isMe={isMe} borderColor={false} hasName />
      <CheckBox
        userId={userId}
        checked={isChecked ?? true}
        handleClick={() => {
          handleClick(userId, !isChecked);
        }}
      />
    </Wrap>
  );
}
