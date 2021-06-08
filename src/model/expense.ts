import { Animals } from 'api/types';

export interface ExpenseAssignee {
  userId: number;
  nickname: string;
  profileImg: Animals;
  me: boolean;
  price: number;
}

export interface ExpenseInfo {
  expenseId: number;
  payDate: string;
  totalPrice: number;
  title: string;
  payerId: number;
  profileImg: Animals;
  nickName: string;
  individual: boolean;
  getExpenseDetails: ExpenseAssignee[];
}

export interface PostExpenseInfo {
  payerId: number;
  payDate: string;
  totalPrice: number;
  title: string;
  individual: boolean;
  expenseDetails: ExpenseAssigneeInfo[];
}

export interface ExpenseAssigneeInfo {
  userId: number;
  price: number;
}
