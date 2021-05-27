import React from 'react';
import { basicWrap } from 'styles/containers';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import color from 'styles/colors';
import Button, { ButtonType } from 'components/button';
import TextInput from 'components/text-input';
import { CaptionBold } from 'styles/typography';
import Profile, { Animals } from 'components/profile';
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

const MEMBERS = [
  { id: 1, name: '지형', type: Animals.Rabbit, isMe: true },
  { id: 2, name: '유진', type: Animals.Bear, isMe: false },
  { id: 3, name: '주예', type: Animals.Unicorn, isMe: false },
  { id: 4, name: '영진', type: Animals.Panda, isMe: false }
];

export default function Expense() {
  return (
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
          <TextInput placeholder="금액입력(원)" type="number" />
          <TextInput placeholder="내용입력" type="text" />
        </div>
        <SelectWrap>
          <Caption>낸 사람</Caption>
          <PayerButton>
            <Profile name="지형" type={Animals.Rabbit} isMe hasName />
          </PayerButton>

          <Caption>쓴 사람</Caption>
          {Array.isArray(MEMBERS) &&
            MEMBERS.map(({ name, type, isMe }) => <UserCheckbox name={name} type={type} isMe={isMe} />)}
        </SelectWrap>
      </FormWrap>
      <Button
        css={css`
          margin-top: 16px;
        `}
      >
        저장
      </Button>
    </div>
  );
}
