import React from 'react';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { mediaQuery, calcSize } from 'styles/media';
import { squareButton } from 'styles/buttons';
import { basicWrap } from 'styles/containers';
import { title1 } from 'styles/typography';

const title = css`
  ${title1}
  margin-bottom: ${calcSize(24)};

  ${mediaQuery(640)} {
    margin-bottom: 58px;
  }
`;

const blank = css`
  width: ${calcSize(300)};
  height: ${calcSize(300)};
  background-color: #e0e0e0;
  border-radius: 100%;

  ${mediaQuery(640)} {
    width: 480px;
    height: 480px;
  }
`;

const loginBtn = css`
  ${squareButton}
  background-color: ${color.kakaoYellow};
  color: rgb(0, 0, 0, 0.85);
  margin-top: ${calcSize(63)};

  ${mediaQuery(640)} {
    margin-top: 126px;
  }
`;

const subText = css`
  font-size: ${calcSize(14)};
  line-height: 1.57;
  color: #4f4f4f;
  letter-spacing: ${calcSize(-0.41)};
  text-align: center;
  margin-top: ${calcSize(7)};

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
