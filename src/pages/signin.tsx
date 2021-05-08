import React from 'react';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import { basicWrap } from 'styles/containers';
import { title1 } from 'styles/typography';

import Button from 'components/button';
import InputBox from 'components/inputBox';

const button = css`
  background: ${color.purple};
  color: ${color.white};
  margin-top: ${pxToVw(40)};

  ${mediaQuery(640)} {
    margin-top: 40px;
  }
`;

const title = css`
  ${title1};
  text-align: left;
  align-self: flex-start;
`;

const blank = css`
  width: ${pxToVw(120)};
  height: ${pxToVw(120)};
  background-color: ${color.border.gray01};
  border-radius: 100%;
  margin: ${pxToVw(40)} 0 ${pxToVw(16)};

  ${mediaQuery(640)} {
    width: 160px;
    height: 160px;
    margin: 58px 0 27px;
  }
`;

export default function Signin() {
  console.log('test');
  return (
    <div css={basicWrap}>
      <h1 css={title}>
        ourney에서 사용할 <br />
        프로필을 만들어주세요
      </h1>
      <div css={blank} />
      <InputBox placeholder="카카오 닉네임" label="이름" note="최소 0자 최대 0자 입력가능해요." />
      <Button label="다음" customStyle={button} onClick={() => alert('signin')} />
    </div>
  );
}
