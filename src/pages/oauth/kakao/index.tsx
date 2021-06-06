import React from 'react';
import { setLocalStorage, useQueryString } from 'utils';
import useKakaoToken from 'hooks/data/useKakaoToken';

export default function KakaoLogin() {
  const code = useQueryString().get('code');
  const { isLoading, data } = useKakaoToken(code || '');

  if (!isLoading && data) {
    setLocalStorage('accessToken', data.accessToken);
    setLocalStorage('refreshToken', data.refreshToken);
  }

  return <div>카카오 로그인 중</div>;
}
