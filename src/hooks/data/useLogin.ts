import http from 'api';
import { useQuery } from 'react-query';

interface Response {
  message: string;
}

interface GoogleLogin {
  googleId: string;
  name: string;
  email: string;
}

function postGoogleLogin(data: GoogleLogin) {
  return http.post<Response, GoogleLogin>('/googleLogin', data);
}

export default function useGoogleLogin(data: GoogleLogin) {
  return useQuery('useGoogleLogin', () => postGoogleLogin(data), { enabled: false });
}
