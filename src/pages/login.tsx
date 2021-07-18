import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import http, { RequestBodyConfig } from 'api';
import { mediaQuery, pxToVw } from 'styles/media';
import { basicWrap, flexAlignCenter, flexCenter, grayBackground } from 'styles/containers';
import { Heading3, Heading7, Caption, Heading6 } from 'styles/typography';
import Button from 'components/button';
import { Link, useHistory } from 'react-router-dom';
import { changeStringToDate, makeDateFormat, useQueryString, isError } from 'utils';
import { useGetGuestTrip } from 'hooks/data/useTripInfo';
import GoogleLogin from 'react-google-login';

const googleApiKey = process.env.REACT_APP_Google;

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
  width: 100%;
  border-radius: 8px;
  background-color: white;
  border: 1px solid ${color.grayscale.gray05};
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

// const KakaoIcon = styled.span`
//   width: 24px;
//   height: 24px;
//   margin-right: 4px;
//   background: url('/images/ico_kakaotalk.svg') center no-repeat;
//   background-size: contain;
// `;

const TripInfoContainer = styled.div`
  width: ${pxToVw(200)};
  height: ${pxToVw(132)};
  background: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  ${flexCenter};
  flex-direction: column;
  margin: ${pxToVw(27)} 0 ${pxToVw(38)};

  ${mediaQuery(640)} {
    margin: 30px 0 40px;
    width: 213px;
    height: 134px;
  }
`;

const TripTitle = styled(Heading6)`
  margin-bottom: 16px;
`;

const TripText = styled(Heading7)`
  color: ${color.grayscale.gray03};
`;

const Logo = styled.div`
  width: ${pxToVw(100)};
  height: ${pxToVw(30)};
  background: url('/images/beta_logo_section.svg') no-repeat center;
  background-size: contain;
  margin-bottom: ${pxToVw(25)};

  ${mediaQuery(640)} {
    width: 100px;
    height: 30px;
    margin-bottom: 33px;
  }
`;

// const { Kakao } = window;
// const apiKey = process.env.REACT_APP_KAKAO_APP_KEY;

// Kakao.init(apiKey);

export default function Login() {
  const history = useHistory();
  const tripId = useQueryString().get('tripId');
  const { refetch: getTripInfo, data, error } = useGetGuestTrip(tripId || '');

  useEffect(() => {
    if (tripId !== null) {
      getTripInfo();
    }
  }, [tripId]);

  useEffect(() => {
    if (isError(error)) {
      history.push('/login');
    }
  }, [error, data]);

  // const handleClickLogin = () => {
  //   if (Kakao.isInitialized()) {
  //     Kakao.Auth.authorize({
  //       redirectUri: 'https://divid.kr/oauth/kakao/result',
  //       state: tripId || ''
  //     });
  //   }
  // };

   // Google Login
  const responseGoogle = (res: any) => {
    console.log(res.profileObj);
    const loginConfig = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
    };
    function postGoogleLogin(config: RequestBodyConfig) {
      return http.post<Response, undefined>('/oauth/google', undefined, config);
    }
    postGoogleLogin({ data: loginConfig });
  }; 

  // Login Fail
  const responseFail = (err: any) => {
      console.error(err);
  };

  if (tripId && data) {
    return (
      <div css={[basicWrap, flexCenter, grayBackground]}>
        <Link to="/">
          <Logo />
        </Link>
        <Title>이 여행의 멤버이신가요?</Title>
        <TripInfoContainer>
          <TripTitle>{data.tripName}</TripTitle>
          <TripText>
            {makeDateFormat(changeStringToDate(data.startDate))} - {makeDateFormat(changeStringToDate(data.endDate))}
          </TripText>
        </TripInfoContainer>
        {/* <Button onClick={handleClickLogin} customStyle={button}>
          <>
            <KakaoIcon />
            <Text>카카오로 계속하기</Text>
          </>
        </Button> */}
        <GoogleLogin
          clientId={googleApiKey || ''}
          buttonText="구글 계정으로 시작하기"
          onSuccess={responseGoogle}
          onFailure={responseFail}
          render={renderProps => (
            <Button onClick={renderProps.onClick} customStyle={button}><Text>구글 계정으로 시작하기</Text></Button>
          )}
        />
        <SubText>
          “카카오로 계속하기”를 누름으로써 <Link to="/privacy">개인정보처리방침</Link>과
          <br /> <Link to="/terms">이용약관</Link>에 동의합니다.
        </SubText>
      </div>
    );
  }

  return (
    <div css={[basicWrap, flexAlignCenter, grayBackground]}>
      <Title>
        복잡한 정산은
        <br />
        디빗에서 쉽게!
      </Title>
      <MainImg />
      {/* <Button onClick={handleClickLogin} customStyle={button}>
        <>
          <KakaoIcon />
          <Text>카카오로 계속하기</Text>
        </>
      </Button> */}
      <GoogleLogin
          clientId={googleApiKey || ''}
          buttonText="구글 계정으로 시작하기"
          onSuccess={responseGoogle}
          onFailure={responseFail}
          render={renderProps => (
            <Button onClick={renderProps.onClick} customStyle={button}><Text>구글 계정으로 시작하기</Text></Button>
          )}
      />
      <SubText>
        “카카오로 계속하기”를 누름으로써 <Link to="/privacy">개인정보처리방침</Link>과
        <br /> <Link to="/terms">이용약관</Link>에 동의합니다.
      </SubText>
    </div>
  );
}
