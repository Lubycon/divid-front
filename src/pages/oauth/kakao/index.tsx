import React from 'react';
import { useHistory } from 'react-router-dom';
import { setLocalStorage, useQueryString } from 'utils';
import useKakaoToken from 'hooks/data/useKakaoToken';
import Loading from 'pages/loading';

export default function KakaoLogin() {
  const code = useQueryString().get('code');
  const { isLoading, data } = useKakaoToken(code || '');
  const history = useHistory();

  if (!isLoading && data) {
    const { accessToken, refreshToken } = data;
    setLocalStorage('accessToken', accessToken);
    setLocalStorage('refreshToken', refreshToken);
    accessToken && history.push('/projects');
  }

  return <Loading />;
}
