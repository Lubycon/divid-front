import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import { basicWrap, flexAlignCenter, grayBackground } from 'styles/containers';
import { Heading3, Heading7, Caption } from 'styles/typography';
import Button from 'components/button';
import { Link } from 'react-router-dom';

const Title = styled(Heading3)`
  margin-bottom: 24px;
  text-align: center;

  ${mediaQuery(640)} {
    margin-bottom: 58px;
    font-size: 32px;
  }
`;

const MainImg = styled.div`
  width: ${pxToVw(280)};
  height: ${pxToVw(280)};
  background: url('/images/img_login.svg') center no-repeat;
  background-size: contain;

  ${mediaQuery(640)} {
    width: 480px;
    height: 480px;
  }
`;

const button = css`
  background-color: ${color.kakaoYellow};
  color: rgb(0, 0, 0, 0.85);
  margin-top: 36px;

  ${mediaQuery(640)} {
    margin-top: 60px;
  }
`;

const Text = styled(Heading7)`
  display: inline-block;
`;

const SubText = styled(Caption)`
  line-height: 1.57;
  color: #4f4f4f;
  text-align: center;
  margin-top: 12px;

  ${mediaQuery(640)} {
    margin-top: 24px;
  }

  a {
    color: #4f4f4f;
    text-decoration: underline;
  }
`;

const KakaoIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  background: url('/images/ico_kakaotalk.svg') center no-repeat;
  background-size: contain;
`;

export default function Login() {
  const { Kakao } = window;
  const apiKey = process.env.REACT_APP_KAKAO_APP_KEY;

  console.log(Kakao);

  Kakao.init(apiKey);

  const handleClickLogin = () => {
    if (Kakao.isInitialized()) {
      Kakao.Auth.authorize({
        redirectUri: 'http://localhost:8081/oauth/kakao/result'
      });
    }
  };

  return (
    <div css={[basicWrap, flexAlignCenter, grayBackground]}>
      <Title>
        복잡한 정산은
        <br />
        디빗에서 쉽게!
      </Title>
      <MainImg />
      <Button onClick={handleClickLogin} customStyle={button}>
        <>
          <KakaoIcon />
          <Text>카카오로 계속하기</Text>
        </>
      </Button>
      <SubText>
        “카카오로 계속하기”를 누름으로써 <Link to="/privacy">개인정보처리방침</Link>과
        <br /> <Link to="/terms">이용약관</Link>에 동의합니다.
      </SubText>
    </div>
  );
}
