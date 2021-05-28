import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import Button from 'components/button';
import color from 'styles/colors';
import { flexCenter } from 'styles/containers';
import { Heading4, Heading5, Heading7 as Label } from 'styles/typography';

const Container = styled.div<{ isFocused: boolean }>`
  width: 327px;
  height: 234px;
  background: ${color.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  padding: 24px 16px;
  box-sizing: border-box;

  position: fixed;
  top: ${({ isFocused }) => (isFocused ? 175 : 273)}px;
  transition: top 0.4s ease-in-out;
`;

const JoinImg = styled.div<{ isFocused: boolean }>`
  position: fixed;
  top: 159px;
  left: 114px;
  width: 160px;
  height: 148px;
  background: url('/images/img_join.svg') center no-repeat;
  background-size: contain;
  opacity: ${({ isFocused }) => (isFocused ? 0 : 1)};
  transition: opacity 0.4s ease-in-out;
`;

const TripName = styled(Heading4)`
  line-height: 1;
  margin-bottom: 4px;
`;

const Info = styled(Label)`
  color: ${color.grayscale.gray03};
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  border: none;
  padding: 0;
  color: transparent;

  &:focus {
    outline: none;
  }
`;

const NumberBox = styled.div`
  width: 32px;
  height: 38px;
  background: #f7f7f7;
  border: 1px solid #d5d6d7;
  box-sizing: border-box;
  border-radius: 4px;
  ${flexCenter}
  margin: 0 4px;
`;

const Number = styled(Heading5)`
  color: ${color.primary};
`;

const BoxsWrap = styled.div`
  width: 100%;
  ${flexCenter};
  padding-bottom: 24px;
`;

export default function TripContainer() {
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validPW = e.target.value.slice(0, 2);

    if (e.target.value.length <= 2) {
      setPassword(validPW);
    }
    e.target.value = validPW;
  };

  return (
    <Container isFocused={isFocused}>
      <JoinImg isFocused={isFocused} />
      <TripName>강원도 우정여행</TripName>
      <Info>4.16금 - 4.17토, 1명</Info>
      <PasswordInput handleChange={handleChange} password={password} setIsFocused={setIsFocused} />
    </Container>
  );
}

interface PasswordInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  setIsFocused: (b: boolean) => void;
}

function PasswordInput({ handleChange, password, setIsFocused }: PasswordInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef && inputRef.current) {
      console.log('inputFocused!');
      inputRef.current.focus();
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
        onFocus={() => setIsFocused(true)}
      />
      <BoxsWrap onClick={focusInput}>
        <NumberBox>
          <Number>{password[0] ?? undefined}</Number>
        </NumberBox>
        <NumberBox>
          <Number>{password[1] ?? undefined}</Number>
        </NumberBox>
      </BoxsWrap>
      <Button disabled={password.length < 2}>
        <Label>들어가기</Label>
      </Button>
    </>
  );
}
