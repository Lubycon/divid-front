import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { changeStringToDate, makeDateFormat, isError } from 'utils';

import Button from 'components/button';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';

import { flexCenter } from 'styles/containers';
import SnackBar from 'components/snack-bar';
import { Heading4, Heading5, Heading7 } from 'styles/typography';
import { GuestTripInfo } from 'model/trip';
import { useJoinTrip } from 'hooks/data/useTripInfo';
import { useHistory } from 'react-router';

const Container = styled.div<{ isFocused: boolean }>`
  width: ${pxToVw(327)};
  height: ${pxToVw(234)};
  background: ${color.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  padding: ${pxToVw(24)} ${pxToVw(16)};
  box-sizing: border-box;
  position: fixed;
  top: ${({ isFocused }) => (isFocused ? pxToVw(175) : pxToVw(273))};
  transition: top 0.4s ease-in-out;
  display: flex;
  flex-direction: column;

  ${mediaQuery(640)} {
    width: 327px;
    height: 234px;
    padding: 24px 16px;
    margin-top: 130px;
    position: relative;
    top: 0;
    transform: none;
  }
`;

const JoinImg = styled.div<{ isFocused: boolean }>`
  position: fixed;
  top: ${pxToVw(159)};
  left: ${pxToVw(114)};
  width: ${pxToVw(160)};
  height: ${pxToVw(148)};
  background: url('/images/img_join.svg') center no-repeat;
  background-size: contain;
  opacity: ${({ isFocused }) => (isFocused ? 0 : 1)};
  transition: opacity 0.4s ease-in-out;

  ${mediaQuery(640)} {
    top: 159px;
    left: 114px;
    width: 160px;
    height: 148px;
    opacity: 1;
    transform: none;
    position: absolute;
    top: -114px;
    left: 90px;
  }
`;

const TripName = styled(Heading4)`
  line-height: 1;
  margin-bottom: 4px;
`;

const Info = styled(Heading7)`
  color: ${color.grayscale.gray03};
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

const Input = styled.input`
  width: 100%;
  height: ${pxToVw(24)};
  border: none;
  padding: 0;
  color: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ${mediaQuery(640)} {
    height: 24px;
  }
`;

const NumberBox = styled.div<{ isWrong: boolean; isFocused: boolean }>`
  width: ${pxToVw(32)};
  height: ${pxToVw(38)};
  background: #f7f7f7;
  border: 1px solid ${({ isWrong }) => (isWrong ? '#ec4c56' : '#d5d6d7')};
  box-sizing: border-box;
  border-radius: 4px;
  ${flexCenter}
  margin: 0 ${pxToVw(4)};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 1px solid ${color.primary};
    `}

  ${mediaQuery(640)} {
    width: 32px;
    height: 38px;
    margin: 0 4px;
  }
`;

const Number = styled(Heading5)`
  color: ${color.primary};
`;

const Text = styled(Heading7)`
  span {
    color: ${color.primary};
  }
`;

const BoxsWrap = styled.div`
  width: 100%;
  ${flexCenter};
  padding-bottom: ${pxToVw(24)};

  ${mediaQuery(640)} {
    padding-bottom: 24px;
  }
`;

export default function TripContainer({ trip, tripId }: { trip: GuestTripInfo; tripId: string | null }) {
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { refetch: joinTrip, error, data } = useJoinTrip(tripId || '', { headers: { inviteCode: password } });
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validPW = e.target.value.slice(0, 2);
    setIsWrong(false);

    if (e.target.value.length <= 2) {
      setPassword(validPW);
    }
    e.target.value = validPW;
  };

  const handleSubmit = () => {
    joinTrip();
  };

  useEffect(() => {
    if (isError(error)) {
      if (error.message === 'Request failed with status code 403') {
        setIsWrong(true);
        setOpenSnackbar(true);

        setTimeout(() => {
          setOpenSnackbar(false);
        }, 3000);
      }
    }
    if (data) {
      console.log(data);
      history.push(`/trip?tripId=${tripId}`);
    }
  }, [error, data]);

  console.log(password);

  return (
    <>
      <Container isFocused={isFocused}>
        <JoinImg isFocused={isFocused} />
        <TripName>{trip.tripName}</TripName>
        <Info>
          {makeDateFormat(changeStringToDate(trip.startDate))} - {makeDateFormat(changeStringToDate(trip.endDate))},{' '}
          {trip.memberCnt}명
        </Info>
        <PasswordInput
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          password={password}
          setIsFocused={setIsFocused}
          isWrong={isWrong}
          isFocused={isFocused}
          setPassword={setPassword}
        />
      </Container>
      {openSnackbar && (
        <SnackBar isOpen={openSnackbar}>
          <Text>코드가 일치하지 않습니다. 코드를 다시 확인하고 입력해주세요.</Text>
        </SnackBar>
      )}
    </>
  );
}

interface PasswordInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  password: string;
  setIsFocused: (b: boolean) => void;
  isWrong: boolean;
  isFocused: boolean;
  setPassword: (s: string) => void;
}

function PasswordInput({
  handleChange,
  handleSubmit,
  password,
  setPassword,
  isWrong,
  isFocused,
  setIsFocused
}: PasswordInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef && inputRef.current) {
      console.log('inputFocused!');
      inputRef.current.focus();
    }
  };

  const resetInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
      setPassword('');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      focusInput();
    }, 3000);
  }, [inputRef]);

  return (
    <>
      <Input
        type="number"
        onChange={handleChange}
        ref={inputRef}
        onBlur={() => setIsFocused(false)}
        onFocus={() => {
          setIsFocused(true);
          resetInput();
        }}
      />
      <BoxsWrap onClick={focusInput}>
        <NumberBox isWrong={isWrong} isFocused={isFocused}>
          <Number>{password[0] ?? undefined}</Number>
        </NumberBox>
        <NumberBox isWrong={isWrong} isFocused={isFocused}>
          <Number>{password[1] ?? undefined}</Number>
        </NumberBox>
      </BoxsWrap>
      <Button disabled={password.length < 2} onClick={handleSubmit}>
        <Label>들어가기</Label>
      </Button>
    </>
  );
}
