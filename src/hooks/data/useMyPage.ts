import http from 'api';
import { MyInfo } from 'model/me';
import { useQuery } from 'react-query';

interface Response {
  message: string;
}

function getMyPage() {
  console.log();
  return http.get<MyInfo>('/users/mypage');
}

function editMyPage(data: MyInfo) {
  return http.put<Response, MyInfo>('/users/mypage', data);
}

function postWithdrawal() {
  // body에 필요한 것 있지 않을지..
  return http.post<Response, undefined>('/users/withdrawal');
}

export function useGetMyPage() {
  return useQuery('getMyPage', () => getMyPage());
}

export function useEditMyPage(data: MyInfo) {
  return useQuery('putMyPage', () => editMyPage(data));
}

export function usePostWithdrawal() {
  return useQuery('postWithdrawal', postWithdrawal);
}
