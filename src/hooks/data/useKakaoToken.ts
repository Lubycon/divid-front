import { useEffect, useState } from 'react';
import axios from 'axios';

import http, { RequestBodyConfig } from 'api';
import { useQuery } from 'react-query';

interface Response {
  message: string;
}

function postKakaoToken(config: RequestBodyConfig) {
  return http.post<Response, undefined>('/auth/login', undefined, config);
}

export default function useKakaoToken(code: string) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;

  useEffect(() => {
    const getKakaoToken = async (codeString: string) => {
      try {
        const data: { [index: string]: string } = {
          grant_type: 'authorization_code',
          client_id: apiKey || '',
          redirect_uri: 'http://localhost:8081/oauth/kakao/result',
          code: codeString
        };
        const queryString = Object.keys(data)
          .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
          .join('&');
        const result = await axios.post('https://kauth.kakao.com/oauth/token', queryString);
        setAccessToken(result.data.access_token);
        return result;
      } catch (e) {
        return e;
      }
    };

    typeof code === 'string' && getKakaoToken(code);
  }, []);

  console.log(accessToken);

  return useQuery('postKakaoToken', () => postKakaoToken({ headers: { accessToken } }), {
    enabled: !!accessToken
  });
}