import React from 'react';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { mediaQuery, calcSize } from 'styles/media';
import { squareButton } from 'styles/buttons';
import { basicWrap } from 'styles/containers';
import { title1 } from 'styles/typography';

import InputBox from 'components/inputBox';

const nextBtn = css`
  ${squareButton};
  background: ${color.purple};
  color: ${color.white};
  margin-top: ${calcSize(40)};

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
  width: ${calcSize(120)};
  height: ${calcSize(120)};
  background-color: ${color.border.gray01};
  border-radius: 100%;
  margin: ${calcSize(40)} 0 ${calcSize(16)};

  ${mediaQuery(640)} {
    width: 160px;
    height: 160px;
    margin: 58px 0 27px;
  }
`;

export default function Signin() {
  return (
    <div css={basicWrap}>
      <h1 css={title}>
        ourney에서 사용할 <br />
        프로필을 만들어주세요
      </h1>
      <div css={blank} />
      <InputBox placeholder="카카오 닉네임" label="이름" subinfo="최소 0자 최대 0자 입력가능해요." />
      <button type="button" css={nextBtn}>
        다음
      </button>
    </div>
  );
}
