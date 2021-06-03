import http from 'api';
import { MyInfo } from 'model/me';
import { useQuery } from 'react-query';
import { getLocalStorage } from 'utils';

// interface Headers {
//   'Content-type': 'application/json';
//   JwtAccessToken: string;
//   JwtRefreshToken?: string;
// }

export function getRequestHeader() {
  const expiredDate = getLocalStorage<number>('expires');
  console.log(expiredDate, Date.now() / 1000);
  if (expiredDate && expiredDate < Date.now() / 1000) {
    return {
      'Content-Type': 'application/json',
      JwtAccessToken: getLocalStorage('accessToken'),
      JwtRefreshToken: getLocalStorage('refreshToken')
    };
  }

  return {
    'Content-Type': 'application/json',
    JwtAccessToken: getLocalStorage('accessToken')
  };
}

interface Response {
  message: string;
}

function getMyPage() {
  console.log({ headers: getRequestHeader() });
  return http.get<MyInfo>('/users/mypage', { headers: getRequestHeader() });
}

function editMyPage(data: MyInfo) {
  return http.put<Response, MyInfo>('/users/mypage', data, { headers: getRequestHeader() });
}

function postWithdrawal() {
  // body에 필요한 것 있지 않을지..
  return http.post<Response, undefined>('/users/withdrawal');
}

export function useGetMyPage() {
  return useQuery('getMyPage', getMyPage);
}

export function useEditMyPage(data: MyInfo) {
  return useQuery('putMyPage', () => editMyPage(data));
}

export function usePostWithdrawal() {
  return useQuery('postWithdrawal', postWithdrawal);
}
