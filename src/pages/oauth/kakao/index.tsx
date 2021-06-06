import React from 'react';
import { setLocalStorage, useQueryString } from 'utils';
import useKakaoToken from 'hooks/data/useKakaoToken';

export default function KakaoLogin() {
  const code = useQueryString().get('code');
  const { isLoading, data } = useKakaoToken(code || '');

  if (!isLoading && data) {
    const { accessToken, refreshToken } = data;
    setLocalStorage('accessToken', accessToken);
    setLocalStorage('refreshToken', refreshToken);
  }

  return <div>카카오 로그인 중</div>;
}
