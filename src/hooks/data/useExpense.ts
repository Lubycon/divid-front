import http from 'api';
import { ExpenseInfo, PostExpenseInfo } from 'model/expense';
import { useQuery } from 'react-query';

interface Response {
  message: string;
  accessToken: string;
  refreshToken: string;
}

function getExpenseInfo(tripId: string, expenseId: number) {
  return http.get<ExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

function editExpenseInfo(tripId: string, expenseId: number) {
  return http.put<Response, ExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

function postExpense(data: PostExpenseInfo) {
  return http.post<Response, PostExpenseInfo>('/expenses', data);
}

function deleteExpense(tripId: string, expenseId: number) {
  return http.post<Response, ExpenseInfo>(`/expenses?tripId=${tripId}&expenseId=${expenseId}`);
}

export function useGetExpenseInfo(tripId: string, expenseId: number) {
  return useQuery('getExpenseInfo', () => getExpenseInfo(tripId, expenseId));
}

export function useEditExpenseInfo(tripId: string, expenseId: number) {
  return useQuery('getExpenseInfo', () => editExpenseInfo(tripId, expenseId));
}

export function usePostExpense(data: PostExpenseInfo) {
  return useQuery('postExpense', () => postExpense(data), { enabled: false });
}

export function useDeleteExpense(tripId: string, expenseId: number) {
  return useQuery('deleteExpense', () => deleteExpense(tripId, expenseId));
}
