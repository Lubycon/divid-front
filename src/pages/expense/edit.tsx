import React, { useEffect, useState } from 'react';
import { basicWrap, flexCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useModal from 'hooks/useModal';
import { useDeleteExpense, useEditExpenseInfo, useGetExpenseInfo } from 'hooks/data/useExpense';
import { numberWithCommas, useQueryString } from 'utils';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useGetTripMembers } from 'hooks/data/useTripInfo';
import { SingleDatePicker } from 'components/date-picker';
import SelectModal from 'components/modal/select-modal';
import ButtonModal from 'components/modal/button-modal';
import Button from 'components/button';
import Profile from 'components/profile';
import TextInput from 'components/text-input';
import { CaptionBold, Heading7 } from 'styles/typography';
import color from 'styles/colors';
import Loading from 'pages/loading';
import UserCheckbox from './user-checkbox';
import Toggle from './toggle';
import { expenseState } from './expense-state';
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

const Label = styled(Heading7)`
  color: ${color.white};
`;

const OptionalButton = styled.div`
  position: absolute;
  top: ${pxToVw(18)};
  right: ${pxToVw(20)};
  text-decoration: none;
  z-index: 1000;

  ${mediaQuery(640)} {
    top: 18px;
    right: 20px;
  }
`;

const ButtonLabel = styled(Heading7)`
  color: ${color.grayscale.gray03};
`;

export default function EditExpense() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newExpense, setNewExpense] = useRecoilState(expenseState);
  const tripId = useQueryString().get('tripId');
  const expenseId = useQueryString().get('expenseId');
  const { refetch, data: initialData } = useGetExpenseInfo(tripId || '', expenseId || '');
  const { data: members, refetch: getTripMember } = useGetTripMembers(tripId || '');
  const { refetch: postExpense, isLoading } = useEditExpenseInfo(tripId || '', expenseId || '', newExpense);
  const resetExpenseState = useResetRecoilState(expenseState);
  const initialPayer = members?.filter((el) => el.userId === newExpense.payerId)[0];
  const { refetch: deleteExpense } = useDeleteExpense(tripId || '', expenseId || '');

  useEffect(() => {
    async function handleOnMount() {
      const { data } = await refetch();
      data &&
        tripId &&
        setNewExpense({
          payerId: data.payerId,
          tripId,
          expenseDetails: data.getExpenseDetails,
          individual: data.individual,
          payDate: data.payDate,
          title: data.title,
          totalPrice: data.totalPrice
        });
      await getTripMember();
    }
    handleOnMount();
  }, []);

  const { handleOpen: openPayerModal, renderModal: renderPayerModal } = useModal({
    children: <SelectModal members={members || []} />
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewExpense({ ...newExpense, title });
  };

  const handleChangeTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    setIsError(false);

    setNewExpense({
      ...newExpense,
      totalPrice: price,
      expenseDetails: newExpense.expenseDetails.map((el) => ({
        userId: el.userId,
        price: price / newExpense.expenseDetails.length
      }))
    });

    e.target.value = e.target.value.replace(/[^0-9 ,]/, '');
  };

  const handleFocusTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/, '');
  };

  const handleBlurTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    e.target.value = numberWithCommas(price);
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    if (newExpense.totalPrice <= 0) {
      setErrorMsg('금액을 확인해주세요.');
      setIsError(true);
      return;
    }

    const addAll = newExpense.expenseDetails.map((el) => el.price).reduce((prev, curr) => prev + curr, 0);
    if (Math.abs(newExpense.totalPrice - addAll) > 10) {
      setErrorMsg('전체 금액과 따로 입력한 금액을 합친 금액이 서로 달라요. 금액을 확인 후 다시 입력해주세요.');
      setIsError(true);
      return;
    }

    await postExpense();
    resetExpenseState();
    window.history.back();
  };

  const DeleteModalContents = (
    <ButtonModal
      type="delete"
      title="정말 삭제하시겠어요?"
      body="삭제한 내역은 복구가 안 돼요"
      buttons={{
        left: {
          label: '취소'
        },
        right: {
          label: '삭제',
          handleClick: () => {
            deleteExpense();
            window.history.back();
          }
        }
      }}
    />
  );

  const { handleOpen: openDeleteModal, renderModal: renderDeleteModal } = useModal({
    children: DeleteModalContents
  });

  const ToggleDutchPay = () => {
    const memberDetail = newExpense.expenseDetails.map(({ userId }) => ({
      userId,
      price: newExpense.totalPrice / newExpense.expenseDetails.length
    }));

    setNewExpense({
      ...newExpense,
      individual: !newExpense.individual,
      expenseDetails: memberDetail
    });
  };

  const handleDate = (date: string) => {
    setNewExpense({
      ...newExpense,
      payDate: date
    });
  };

  if (!initialData || !members || !initialPayer) {
    return <Loading />;
  }

  return (
    <>
      {renderPayerModal()}
      {renderDeleteModal()}
      <div
        css={[
          basicWrap,
          css`
            background-color: ${color.grayscale.gray07};
            position: relative;
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
              onChange={(e) => {
                handleChangeTotalPrice(e);
              }}
              onFocus={handleFocusTotalPrice}
              onBlur={handleBlurTotalPrice}
              defaultValue={initialData.totalPrice}
              error={isError}
              errorMsg={errorMsg}
            />
            <TextInput
              css={css`
                margin-top: 16px;
              `}
              placeholder="내용입력"
              type="text"
              onChange={handleChangeTitle}
              defaultValue={initialData.title}
            />
          </div>
          <SelectWrap>
            <Caption>낸 사람</Caption>
            <PayerButton onClick={openPayerModal}>
              <Profile nickName={initialPayer.nickName} type={initialPayer.profileImg} isMe={initialPayer.me} hasName />
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
            {/* 더치페이인 경우 */}
            {Array.isArray(members) &&
              !newExpense.individual &&
              members.map(({ userId, nickName, profileImg, me }) => (
                <UserCheckbox key={userId} userId={userId} nickName={nickName} type={profileImg} isMe={me} />
              ))}
            {/* 개별 입력인 경우 */}
            {Array.isArray(members) &&
              newExpense.individual &&
              members.map(({ userId, nickName, profileImg, me }) => (
                <IndividualInput
                  key={userId}
                  userId={userId}
                  nickName={nickName}
                  type={profileImg}
                  isMe={me}
                  isError={isError}
                />
              ))}
          </SelectWrap>
        </FormWrap>
        <Button
          onClick={handleSubmit}
          css={css`
            margin-top: 16px;
          `}
        >
          <Label>저장</Label>
        </Button>
        <OptionalButton onClick={openDeleteModal}>
          <ButtonLabel>삭제</ButtonLabel>
        </OptionalButton>
      </div>
    </>
  );
}
