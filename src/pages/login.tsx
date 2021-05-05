import React from 'react';
import { css } from '@emotion/react';
import color from '../styles/colors';

const wrap = css`
  width: 100%;
  padding: 17.6vw 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
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

  @media (min-width: 640px) {
    font-size: 32px;
    margin-bottom: 58px;
  }
`;

const box = css`
  width: 80vw;
  height: 80vw;
  background-color: #e0e0e0;

  @media (min-width: 640px) {
    width: 480px;
    height: 480px;
  }
`;

const loginBtn = css`
  width: 78.6666666667vw;
  height: 15.4666666667vw;
  border-radius: 2.1333333333vw;
  background-color: ${color.kakaoYellow};
  margin-top: 16.8vw;
  font-size: 4.2666666667vw;
  font-weight: bold;
  color: rgb(0, 0, 0, 0.85);

  @media (min-width: 640px) {
    width: 560px;
    height: 58px;
    border-radius: 8px;
    margin-top: 126px;
    font-size: 16px;
  }
`;

const subText = css`
  font-size: 3.7333333333vw;
  line-height: 1.57;
  color: #4f4f4f;
  letter-spacing: -0.1093333333vw;
  text-align: center;
  margin-top: 1.8666666667vw;

  @media (min-width: 640px) {
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

  Kakao.init(apiKey);

  const onClickLogin = () => {
    if (Kakao.isInitialized()) {
      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth'
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
      <button type="button" onClick={onClickLogin} css={loginBtn}>
        카카오로 계속하기
      </button>
      <p css={subText}>
        “카카오로 계속하기”를 누름으로써 <br />
        <a href="/#">개인정보처리방침</a>과 <a href="/#">이용약관</a>에 동의합니다.
      </p>
    </div>
  );
}
