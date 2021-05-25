import React from 'react';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import { basicWrap } from 'styles/containers';
import { title1 } from 'styles/typography';
import Button from 'components/button';

const title = css`
  ${title1}
  margin-bottom: ${pxToVw(24)};

  ${mediaQuery(640)} {
    margin-bottom: 58px;
  }
`;

const blank = css`
  width: ${pxToVw(300)};
  height: ${pxToVw(300)};
  background-color: #e0e0e0;
  border-radius: 100%;

  ${mediaQuery(640)} {
    width: 480px;
    height: 480px;
  }
`;

const button = css`
  background-color: ${color.kakaoYellow};
  color: rgb(0, 0, 0, 0.85);
  margin-top: ${pxToVw(63)};

  ${mediaQuery(640)} {
    margin-top: 126px;
  }
`;

const subText = css`
  font-size: ${pxToVw(14)};
  line-height: 1.57;
  color: #4f4f4f;
  letter-spacing: ${pxToVw(-0.41)};
  text-align: center;
  margin-top: ${pxToVw(7)};

  ${mediaQuery(640)} {
    font-size: 14px;
    letter-spacing: -0.41px;
    margin-top: 7px;
  }

  a {
    color: #4f4f4f;
  }
`;

export default function Login() {
  const { Kakao } = window;
  const apiKey = process.env.REACT_APP_KAKAO_APP_KEY;

  console.log(Kakao);

  Kakao.init(apiKey);

  const handleClickLogin = () => {
    if (Kakao.isInitialized()) {
      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth/kakao/result'
      });
    }
  };

  return (
    <div css={basicWrap}>
      <h1 css={title}>
        복잡한 정산은 <br />
        ourney에서 쉽게!
      </h1>
      <div css={blank}>slider</div>
      <Button onClick={handleClickLogin} customStyle={button}>카카오로 계속하기</Button>
      <p css={subText}>
        “카카오로 계속하기”를 누름으로써 <br />
        <a href="/#">개인정보처리방침</a>과 <a href="/#">이용약관</a>에 동의합니다.
      </p>
    </div>
  );
}
