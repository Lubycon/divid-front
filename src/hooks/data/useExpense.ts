import http from 'api';
import { ExpenseInfo, PostExpenseInfo, ExpenseListInfo, CalculateDetailList, SummaryDetailList } from 'model/expense';
import { useQuery } from 'react-query';

interface Response {
  message: string;
  accessToken: string;
  refreshToken: string;
}

function getExpenseInfo(tripId: string, expenseId: string) {
  return http.get<ExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

function editExpenseInfo(tripId: string, expenseId: string, data: PostExpenseInfo) {
  return http.put<Response, PostExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`, data);
}

function postExpense(data: PostExpenseInfo) {
  return http.post<Response, PostExpenseInfo>('/expenses', data);
}

function deleteExpense(tripId: string, expenseId: string) {
  return http.delete<Response>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

function getExpenseAll(tripId: string) {
  return http.get<ExpenseListInfo[]>(`/expenses/all?tripId=${tripId}`);
}

function getCalculateDetail(tripId: string) {
  return http.get<CalculateDetailList[]>(`/expenses/calculate/all?tripId=${tripId}`);
}

function getSummaryExpense(tripId: string) {
  return http.get<SummaryDetailList>(`/expenses/calculate/summary?tripId=${tripId}`);
}

export function useGetExpenseInfo(tripId: string, expenseId: string) {
  return useQuery('getExpenseInfo', () => getExpenseInfo(tripId, expenseId));
}

export function useEditExpenseInfo(tripId: string, expenseId: string, data: PostExpenseInfo) {
  return useQuery('getExpenseInfo', () => editExpenseInfo(tripId, expenseId, data));
}

export function usePostExpense(data: PostExpenseInfo) {
  return useQuery('postExpense', () => postExpense(data), { enabled: false });
}

export function useDeleteExpense(tripId: string, expenseId: string) {
  return useQuery('deleteExpense', () => deleteExpense(tripId, expenseId), { enabled: false });
}

export function useGetExpenseAll(tripId: string) {
  return useQuery('getExpenseAll', () => getExpenseAll(tripId));
}

export function useGetCalculateDetail(tripId: string) {
  return useQuery('getCalculateDetail', () => getCalculateDetail(tripId));
}

export function useGetSummaryExpense(tripId: string) {
  return useQuery('getSummaryExpense', () => getSummaryExpense(tripId));
}
