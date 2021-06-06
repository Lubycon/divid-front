import { useEffect, useState } from 'react';
import { getKeys } from 'utils';
import http, { RequestBodyConfig } from 'api';
import { useQuery } from 'react-query';

interface Response {
  message: string;
  accessToken: string;
  refreshToken: string;
}

interface KakaoAuthQuery {
  grant_type: 'authorization_code';
  client_id: string;
  redirect_uri: string;
  code: string;
}

interface InitialToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export default function useKakaoToken(code: string) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;

  useEffect(() => {
    const getKakaoToken = async (codeString: string) => {
      try {
        const data: KakaoAuthQuery = {
          grant_type: 'authorization_code',
          client_id: apiKey || '',
          redirect_uri: 'http://localhost:8081/oauth/kakao/result',
          code: codeString
        };
        const queryString = getKeys(data)
          .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
          .join('&');
        const result = await http.post<InitialToken, string>('https://kauth.kakao.com/oauth/token', queryString);
        setAccessToken(result.access_token);
        return result;
      } catch (e) {
        return e;
      }
    };

    typeof code === 'string' && getKakaoToken(code);
  }, []);

  console.log(accessToken);

  function postKakaoToken(config: RequestBodyConfig) {
    return http.post<Response, undefined>('/auth/login', undefined, config);
  }

  return useQuery('postKakaoToken', () => postKakaoToken({ headers: { accessToken } }), {
    enabled: !!accessToken
  });
}
