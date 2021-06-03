import { Animals } from 'api/types'

export interface MemberInfo {
  userId: number;
  nickName: string;
  profile: Animals;
  me: boolean;
}

export interface ExpenseAssignee {
  userId: number;
  nickname: string;
  profileImg: Animals;
  me: boolean;
  price: number;
}
