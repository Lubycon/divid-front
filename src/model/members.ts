import { Animals } from 'api/types';

export interface MemberInfo {
  userId: number;
  nickName: string;
  profileImg: Animals;
  me: boolean;
}

export interface ExpenseAssignee {
  userId: number;
  nickname: string;
  profileImg: Animals;
  me: boolean;
  price: number;
}
