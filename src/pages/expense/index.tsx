import React, { useEffect } from 'react';
import { basicWrap, flexCenter } from 'styles/containers';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useModal from 'hooks/useModal';
import { usePostExpense } from 'hooks/data/useExpense';
import { numberWithCommas, useQueryString } from 'utils';
import { useRecoilState } from 'recoil';
import { useGetTripMembers } from 'hooks/data/useTripInfo';
import { SingleDatePicker } from 'components/date-picker';

import SelectModal from 'components/modal/select-modal';
import { mediaQuery } from 'styles/media';
import color from 'styles/colors';
import Button from 'components/button';
import Loading from 'pages/loading';
import TextInput from 'components/text-input';
import { CaptionBold } from 'styles/typography';
import Profile from 'components/profile';
import UserCheckbox from './user-checkbox';
import Toggle from './toggle';
import { expenseState, expenseAssigneeState } from './expense-state';
import IndividualInput from './individual-input';

const FormWrap = styled.div`
  width: 100%;
  min-height: 300px;
  padding: 16px 16px 20px;
  background: ${color.white};
  border: 1px solid ${color.grayscale.gray05};
  border-radius: 16px;
  box-sizing: border-box;

  ${mediaQuery(640)} {
    padding: 20px 24px;
  }
`;

const Caption = styled(CaptionBold)`
  color: ${color.grayscale.gray03};
  margin: 12px 0;
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

const ToggleWrap = styled.div``;

export default function Expense() {
  const [newExpense, setNewExpense] = useRecoilState(expenseState);
  const [assignee, setAssignee] = useRecoilState(expenseAssigneeState);
  const tripId = useQueryString().get('tripId');
  const { refetch, data: members } = useGetTripMembers(tripId || '');
  const { refetch: postExpense } = usePostExpense(newExpense);

  useEffect(() => {
    async function handleOnMount() {
      const { data } = await refetch();
      console.log(data);
      data &&
        tripId &&
        setNewExpense({
          ...newExpense,
          payerId: data[0].userId,
          tripId
        });
      data &&
        setAssignee({
          ...assignee,
          members: data.map((member) => ({ userId: member.userId, isAssigned: true }))
        });
    }
    handleOnMount();
  }, []);

  const { handleOpen: openPayerModal, renderModal: renderPayerModal } = useModal({
    children: <SelectModal members={members || []} />
  });

  const handleChangeTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/, '');
    const price = Number(e.target.value);
    if (typeof price === 'number') {
      setNewExpense({
        ...newExpense,
        totalPrice: price
      });
    }
    e.target.value = e.target.value.replace(/[^0-9 ,]/, '');
  };

  const handleBlurTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    e.target.value = numberWithCommas(price);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewExpense({ ...newExpense, title });
    console.log(newExpense);
  };

  const handleSubmit = () => {
    if (newExpense.individual) {
      const assignedMembers = assignee.members.filter((m) => m.isAssigned === true);
      setNewExpense({
        ...newExpense,
        expenseDetails: assignedMembers.map((m) => ({
          userId: m.userId,
          price: newExpense.totalPrice / assignedMembers.length
        }))
      });
    }
    if (!newExpense.individual) {
      const assignedMembers = assignee.members.filter((m) => !!m.price);
      setNewExpense({
        ...newExpense,
        expenseDetails: assignedMembers.map((m) => ({
          userId: m.userId,
          price: m.price || 0
        }))
      });
    }
    return postExpense();
  };

  const ToggleDutchPay = () => {
    setNewExpense({
      ...newExpense,
      individual: !newExpense.individual
    });
  };

  const handleDate = (date: string) => {
    setNewExpense({
      ...newExpense,
      payDate: date
    });
  };

  if (!members) {
    return <Loading />;
  }

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
          <SingleDatePicker setDate={handleDate} />
          <div>
            <TextInput
              css={css`
                margin-top: 16px;
              `}
              placeholder="금액입력(원)"
              type="text"
              onChange={handleChangeTotalPrice}
              onBlur={handleBlurTotalPrice}
            />
            <TextInput
              css={css`
                margin-top: 16px;
              `}
              placeholder="내용입력"
              type="text"
              onChange={handleChangeTitle}
            />
          </div>
          <SelectWrap>
            <Caption>낸 사람</Caption>
            <PayerButton onClick={openPayerModal}>
              <Profile nickName={members[0].nickName} type={members[0].profileImg} isMe={members[0].me} hasName />
            </PayerButton>
            <div
              css={[
                flexCenter,
                css`
                  justify-content: space-between;
                `
              ]}
            >
              <Caption>쓴 사람</Caption>
              <ToggleWrap>
                <Toggle isIndividual={newExpense.individual} onToggle={ToggleDutchPay} />
              </ToggleWrap>
            </div>

            {Array.isArray(members) &&
              !newExpense.individual &&
              members.map(({ userId, nickName, profileImg, me }) => (
                <UserCheckbox key={userId} userId={userId} nickName={nickName} type={profileImg} isMe={me} />
              ))}
            {Array.isArray(members) &&
              newExpense.individual &&
              members.map(({ userId, nickName, profileImg, me }) => (
                <IndividualInput key={userId} userId={userId} nickName={nickName} type={profileImg} isMe={me} />
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
