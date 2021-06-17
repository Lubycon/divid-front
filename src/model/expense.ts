import { Animals } from 'api/types';

export enum GiveOrTake {
  Give = 'GIVE',
  Take = 'TAKE'
}

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

export interface ExpenseListInfo {
  detailResponses: DetailResponse[];
  payDate: string;
  tripTotalPrice: number;
}

export interface DetailResponse {
  expenseId: number;
  me: boolean;
  nickName: string;
  profileImg: Animals;
  title: string;
  totalPrice: number;
  userId: number;
}

export interface CalculateDetail {
  nickName: string;
  payDate: string;
  payerId: number;
  price: number;
  profileImg: Animals;
  type: GiveOrTake;
  userId: number;
}

export interface CalculateDetails {
  id: number;
  me: boolean;
  nickName: string;
  payDate: string;
  profileImg: Animals;
  title: string;
  totalPrice: number;
  calculateListDetails: CalculateDetail[];
}

export interface SummaryDetail {
  nickName: string;
  payerId: number;
  price: number;
  profileImg: Animals;
  type: GiveOrTake;
  userId: number;
}

export interface SummaryDetailList {
  nickName: string;
  detailList: SummaryDetail[];
}
