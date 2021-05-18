import React from 'react';
import { basicWrap } from 'styles/containers';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import color from 'styles/colors';
import Button, { ButtonType } from 'components/button';
import CheckBox from 'components/check-box';
import TextInput from 'components/text-input';
import { CaptionBold } from 'styles/typography';
import Profile, { Animals } from 'components/profile';

const FormWrap = styled.div`
  width: 100%;
  min-height: 300px;
  padding: 16px;
  background: ${color.white};
  border: 1px solid ${color.grayscale.gray05};
  border-radius: 16px;
  box-sizing: border-box;
`;

const Caption = styled(CaptionBold)`
  color: ${color.grayscale.gray03};
`;

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
        <Button buttonType={ButtonType.Round} label="04.16" />
        <div
          css={css`
            margin: 0 5px;
          `}
        >
          <TextInput placeholder="금액입력(원)" type="number" />
          <TextInput placeholder="내용입력" type="text" />
        </div>
        {/* 임시 하드코딩 */}
        <Caption>낸 사람</Caption>
        <Profile type={Animals.Rabbit} isMe hasName />

        <Caption>쓴 사람</Caption>
        <Profile type={Animals.Rabbit} isMe hasName />
        <Profile type={Animals.Rabbit} hasName />
        <Profile type={Animals.Rabbit} hasName />
        <Profile type={Animals.Rabbit} hasName />
        <CheckBox id="random" />
      </FormWrap>
      <Button label="저장" />
    </div>
  );
}
