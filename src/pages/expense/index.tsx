import React, { useEffect } from 'react';
import { basicWrap, flexCenter } from 'styles/containers';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useModal from 'hooks/useModal';
import { usePostExpense } from 'hooks/data/useExpense';
import useTooltip from 'hooks/useTooltip';
import { getLocalStorage, numberWithCommas, useQueryString } from 'utils';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useGetTripMembers } from 'hooks/data/useTripInfo';
import { SingleDatePicker } from 'components/date-picker';
import { Tooltip } from 'components/modal/tooltip';
import SelectModal from 'components/modal/select-modal';
import Button from 'components/button';
import TextInput from 'components/text-input';
import Profile from 'components/profile';

import { mediaQuery, pxToVw } from 'styles/media';
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

  ${mediaQuery(640)} {
    margin-bottom: 9px;
  }
`;

const SelectWrap = styled.div`
  margin: 3px 5px;
`;

const ToggleWrap = styled.div`
  margin: 12px 0;
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

export default function Expense() {
  const [newExpense, setNewExpense] = useRecoilState(expenseState);
  const tripId = useQueryString().get('tripId');
  const { refetch, data: members } = useGetTripMembers(tripId || '');
  const { refetch: postExpense, isLoading } = usePostExpense(newExpense);
  const resetExpenseState = useResetRecoilState(expenseState);
  const payer = members?.filter((el) => el.userId === newExpense.payerId)[0];
  const { handleOpen: openIndividualTooltip, renderModal: renderIndividualTooltip } = useTooltip({
    children: (
      <Tooltip
        text="1/N을 끄면 쓴 돈을 따로 입력할 수 있어요!"
        position={css`
          top: ${pxToVw(427)};
          right: ${pxToVw(24)};
          ${mediaQuery(640)} {
            top: 436px;
            right: 25px;
          }
        `}
        trianglePosition={42}
      />
    ),
    type: 'individual-payment'
  });

  useEffect(() => {
    if (!getLocalStorage('individual-payment')) {
      openIndividualTooltip();
    }
  }, [isLoading]);

  useEffect(() => {
    async function handleOnMount() {
      const { data } = await refetch();
      data &&
        tripId &&
        setNewExpense({
          ...newExpense,
          payerId: data[0].userId,
          tripId,
          expenseDetails: data.map(({ userId }) => ({ userId, price: 0 }))
        });
    }
    handleOnMount();
  }, []);

  const { handleOpen: openPayerModal, renderModal: renderPayerModal } = useModal({
    children: <SelectModal members={members || []} />
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewExpense({ ...newExpense, title });
    console.log(newExpense);
  };

  const handleChangeTotalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);

    setNewExpense({
      ...newExpense,
      totalPrice: price,
      expenseDetails: newExpense.expenseDetails.map((el) => ({
        userId: el.userId,
        price: price / newExpense.expenseDetails.length
      }))
    });

    console.log({ newExpense });
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
    console.log({ newExpense });

    if (newExpense.totalPrice <= 0) {
      console.log('금액을 확인해주세요.');
      return;
    }

    const addAll = newExpense.expenseDetails.map((el) => el.price).reduce((prev, curr) => prev + curr, 0);
    if (Math.abs(newExpense.totalPrice - addAll) > 10) {
      console.log('값을 확인하세요');
      return;
    }

    await postExpense();
    resetExpenseState();
    window.history.back();
  };

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

  if (!members || !payer) {
    return <Loading />;
  }

  return (
    <>
      {renderPayerModal()}
      {renderIndividualTooltip()}
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
              onChange={(e) => {
                handleChangeTotalPrice(e);
              }}
              onFocus={handleFocusTotalPrice}
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
              <Profile nickName={payer.nickName} type={payer.profileImg} isMe={payer.me} hasName borderColor={false} />
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
          <Label>저장</Label>
        </Button>
      </div>
    </>
  );
}
