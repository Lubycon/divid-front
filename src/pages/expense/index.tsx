import React from 'react';
import { basicWrap } from 'styles/containers';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useModal from 'hooks/useModal';
import { Animals } from 'api/types';
import { changeDateToString } from 'utils';
import { MemberInfo } from 'model/members';
import { atom, useRecoilState } from 'recoil';

import SelectModal from 'components/modal/select-modal';
import color from 'styles/colors';
import Button, { ButtonType } from 'components/button';
import TextInput from 'components/text-input';
import { CaptionBold } from 'styles/typography';
import Profile from 'components/profile';
import UserCheckbox from './user-checkbox';

const FormWrap = styled.div`
  width: 100%;
  min-height: 300px;
  padding: 16px 16px 20px;
  background: ${color.white};
  border: 1px solid ${color.grayscale.gray05};
  border-radius: 16px;
  box-sizing: border-box;
`;

const Caption = styled(CaptionBold)`
  color: ${color.grayscale.gray03};
  margin-bottom: 12px;
`;

const PayerButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  padding: 0;
  margin-bottom: 21px;
`;

const SelectWrap = styled.div`
  margin: 3px 5px;
`;

export const MEMBERS: MemberInfo[] = [
  { userId: 1, nickName: '지형', profile: Animals.Rabbit, me: true },
  { userId: 2, nickName: '유진', profile: Animals.Bear, me: false },
  { userId: 3, nickName: '주예', profile: Animals.Unicorn, me: false },
  { userId: 4, nickName: '영진', profile: Animals.Panda, me: false }
];

export const expenseState = atom({
  key: 'expenseState',
  default: {
    payer: MEMBERS[0],
    payDate: changeDateToString(new Date()),
    totalPrice: 0,
    title: '',
    individual: true,
    expenseDetails: MEMBERS.map((m) => ({ ...m, price: 0 }))
  }
});

export default function Expense() {
  const [newExpense, setNewExpense] = useRecoilState(expenseState);
  const { handleOpen: openPayerModal, renderModal: renderPayerModal } = useModal({
    children: <SelectModal members={MEMBERS} />
  });

  const handleChangeTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    if (typeof price === 'number') {
      setNewExpense({ ...newExpense, totalPrice: price });
    }
    console.log(newExpense);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewExpense({ ...newExpense, title });
    console.log(newExpense);
  };

  const handleSubmit = () => {
    setNewExpense({
      ...newExpense,
      expenseDetails: MEMBERS.map((m) => ({ ...m, price: newExpense.totalPrice / MEMBERS.length }))
    });
    return console.log(newExpense);
  };

  return (
    <>
      {renderPayerModal()}
      <div
        css={[
          basicWrap,
          css`
            background-color: ${color.grayscale.gray07};
          `
        ]}
      >
        <FormWrap>
          <Button buttonType={ButtonType.Round}>04.16</Button>
          <div
            css={css`
              margin: 0 5px;
            `}
          >
            <TextInput placeholder="금액입력(원)" type="number" onBlur={handleChangeTotalPrice} />
            <TextInput placeholder="내용입력" type="text" onBlur={handleChangeTitle} />
          </div>
          <SelectWrap>
            <Caption>낸 사람</Caption>
            <PayerButton onClick={openPayerModal}>
              <Profile
                nickName={newExpense.payer.nickName}
                type={newExpense.payer.profile}
                isMe={newExpense.payer.me}
                hasName
              />
            </PayerButton>
            <Caption>쓴 사람</Caption>
            {Array.isArray(MEMBERS) &&
              MEMBERS.map(({ userId, nickName, profile, me }) => (
                <UserCheckbox key={userId} nickName={nickName} type={profile} isMe={me} />
              ))}
          </SelectWrap>
        </FormWrap>
        <Button
          onClick={handleSubmit}
          css={css`
            margin-top: 16px;
          `}
        >
          저장
        </Button>
      </div>
    </>
  );
}
