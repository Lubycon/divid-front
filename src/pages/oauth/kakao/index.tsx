import React from 'react';
// import axios from 'axios';
import { Token } from 'api/types';
import jwt_decode from 'jwt-decode';
import { setLocalStorage, useQueryString } from 'utils';
import useKakaoToken from 'hooks/data/useKakaoToken';

export default function KakaoLogin() {
  const code = useQueryString().get('code');
  const { isLoading, data } = useKakaoToken(code || '');

  if (!isLoading && data) {
    // axios.defaults.headers.common.accessToken = data.headers.jwtaccesstoken;
    // console.log(data);

    const decodedAccessToken: Token = jwt_decode(data.headers.jwtaccesstoken);
    const decodedRefreshToken: Token = jwt_decode(data.headers.jwtrefreshtoken);
    console.log({ decodedAccessToken, decodedRefreshToken });
    setLocalStorage('accessToken', data.headers.jwtaccesstoken);
    setLocalStorage('refreshToken', data.headers.jwtrefreshtoken);
    setLocalStorage('expires', decodedAccessToken.exp);
  }

  return <div>카카오 로그인 중</div>;
}
