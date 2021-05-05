import React from 'react';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { mediaQuery } from 'styles/media';
import { squareButton } from 'styles/buttons';

const wrap = css`
  width: 100%;
  padding: 17.6vw 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mediaQuery(640)} {
    width: 640px;
    margin: 0 auto;
    padding: 66px 0;
  }
`;

const title = css`
  font-weight: bold;
  font-size: 8.5333333333vw;
  text-align: center;
  line-height: 1.3;
  margin-bottom: 6.4vw;

  ${mediaQuery(640)} {
    font-size: 32px;
    margin-bottom: 58px;
  }
`;

const box = css`
  width: 80vw;
  height: 80vw;
  background-color: #e0e0e0;

  ${mediaQuery(640)} {
    width: 480px;
    height: 480px;
  }
`;

const loginBtn = css`
  ${squareButton}
  background-color: ${color.kakaoYellow};
  color: rgb(0, 0, 0, 0.85);
`;

const subText = css`
  font-size: 3.7333333333vw;
  line-height: 1.57;
  color: #4f4f4f;
  letter-spacing: -0.1093333333vw;
  text-align: center;
  margin-top: 1.8666666667vw;

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
    <div css={wrap}>
      <p css={title}>
        복잡한 정산은 <br />
        ourney에서 쉽게!
      </p>
      <div css={box}>slider</div>
      <button type="button" onClick={handleClickLogin} css={loginBtn}>
        카카오로 계속하기
      </button>
      <p css={subText}>
        “카카오로 계속하기”를 누름으로써 <br />
        <a href="/#">개인정보처리방침</a>과 <a href="/#">이용약관</a>에 동의합니다.
      </p>
    </div>
  );
}
