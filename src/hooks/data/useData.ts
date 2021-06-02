import http from 'api';
import * as Type from 'api/types';
import { useQuery } from 'react-query';

interface Response {
  message: string;
}

function getMyPage() {
  return http.get<Type.MyInfo>('/users/mypage');
}

function editMyPage(data: Type.MyInfo) {
  return http.put<Response, Type.MyInfo>('/users/mypage', data);
}

function postWithdrawal() {
  // body에 필요한 것 있지 않을지..
  return http.post<Response, undefined>('/users/withdrawal');
}

function postTrip(data: Type.TripMinInfo) {
  return http.post<Response, Type.TripMinInfo>('/trips', data);
}

function getTripLists() {
  return http.get<Type.TripInfo>('/trips/all');
}

function getDetailTripInfo(tripId: string) {
  return http.get<Type.TripInfo>(`/trips?tripId=${tripId}`);
}

function editTripInfo(tripId: string) {
  return http.put<Response, Type.TripEditInfo>(`/trips?tripId=${tripId}`);
}

function exitTrip(tripId: string) {
  return http.post<Response, undefined>(`/trips/exit?tripId=${tripId}`);
}

function deleteTrip(tripId: string) {
  return http.delete<Response>(`/trips?tripId=${tripId}`);
}

function getTripMembers(tripId: string) {
  return http.get<Type.TripInfo>(`/trips/members?tripId=${tripId}`);
}

function getExpenseInfo(tripId: string, expenseId: number) {
  return http.get<Type.ExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

function editExpenseInfo(tripId: string, expenseId: number) {
  return http.put<Response, Type.ExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

function postExpense(data: Type.ExpenseInfo) {
  return http.post<Response, Type.ExpenseInfo>('/expenses', data);
}

function deleteExpense(tripId: string, expenseId: number) {
  return http.post<Response, Type.ExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

export function useGetMyPage() {
  return useQuery('getMyPage', getMyPage);
}

export function useEditMyPage(data: Type.MyInfo) {
  return useQuery('putMyPage', () => editMyPage(data));
}

export function usePostWithdrawal() {
  return useQuery('postWithdrawal', postWithdrawal);
}

export function usePostTrip(data: Type.TripMinInfo) {
  return useQuery('postTrip', () => postTrip(data));
}

export function useGetTripLists() {
  return useQuery('getAllTrips', getTripLists);
}

export function useGetDetailTripInfo(tripId: string) {
  return useQuery('getDetailTripInfo', () => getDetailTripInfo(tripId));
}

export function useEditTripInfo(tripId: string) {
  return useQuery('editTripInfo', () => editTripInfo(tripId));
}

export function useExitTrip(tripId: string) {
  return useQuery('exitTrip', () => exitTrip(tripId));
}

export function useDeleteTrip(tripId: string) {
  return useQuery('deleteTrip', () => deleteTrip(tripId));
}

export function useGetTripMembers(tripId: string) {
  return useQuery('getTripMembers', () => getTripMembers(tripId));
}

export function useGetExpenseInfo(tripId: string, expenseId: number) {
  return useQuery('getExpenseInfo', () => getExpenseInfo(tripId, expenseId));
}

export function useEditExpenseInfo(tripId: string, expenseId: number) {
  return useQuery('getExpenseInfo', () => editExpenseInfo(tripId, expenseId));
}

export function usePostExpense(data: Type.ExpenseInfo) {
  return useQuery('postExpense', () => postExpense(data));
}

export function useDeleteExpense(tripId: string, expenseId: number) {
  return useQuery('deleteExpense', () => deleteExpense(tripId, expenseId));
}
