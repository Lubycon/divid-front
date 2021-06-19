import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Profile, { ProfileProps } from 'components/profile';
import { flexAlignCenter } from 'styles/containers';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
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

export default function IndividualInput({ userId, nickName, type, isMe }: CheckboxProps) {
  const [initialPrice, setInitialPrice] = useState<number | null>(null);
  const [newExpense, setNewExpense] = useRecoilState(expenseState);

  useEffect(() => {
    if (newExpense.totalPrice > 0) {
      setInitialPrice(Math.floor(newExpense.totalPrice / newExpense.expenseDetails.length));
      return;
    }
    setInitialPrice(0);
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = '';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/, '');
    const price = Number(e.target.value);
    const updateInfo = newExpense.expenseDetails.filter((el) => el.userId !== userId);
    if (price === 0) {
      setNewExpense({ ...newExpense, expenseDetails: updateInfo });
      return;
    }
    setNewExpense({ ...newExpense, expenseDetails: [...updateInfo, { userId, price }] });
    e.target.value = e.target.value.replace(/[^0-9 ,]/, '');
  };

  return (
    <Wrap>
      <Profile nickName={nickName} type={type} isMe={isMe} hasName />
      <PriceInput
        type="text"
        placeholder="금액입력"
        defaultValue={initialPrice ?? ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Wrap>
  );
}
