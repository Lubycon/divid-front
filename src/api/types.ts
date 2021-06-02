export enum Animals {
  Bear = 'bear',
  Puppy = 'puppy',
  Unicorn = 'unicorn',
  Hamster = 'hamster',
  Fox = 'fox',
  Panda = 'panda',
  Tiger = 'tiger',
  Rabbit = 'rabbit'
}

export interface MyInfo {
  nickName: string;
  profile: Animals;
}

export interface MemberInfo {
  userId: number;
  nickName: string;
  profile: Animals;
  me: boolean;
}

export interface TripEditInfo {
  tripName: string;
  startDate: string;
  endDate: string;
}

export interface TripMinInfo {
  tripId: string;
  tripName: string;
  startDate: string;
  endDate: string;
}

export interface TripInfo {
  tripId: string;
  tripName: string;
  inviteCode: number;
  startDate: string;
  endDate: string;
  userInfoResponseList: MemberInfo[];
}

export interface TripCard {
  tripId: string;
  tripName: string;
  startDate: string;
  endDate: string;
  memberCnt: number;
  end: boolean;
  userInfoResponseList: MemberInfo[];
}

export interface ExpenseAssignee {
  userId: number;
  nickname: string;
  profileImg: Animals;
  me: boolean;
  price: number;
}

export interface ExpenseInfo {
  expenseId: number,
  payDate: string,
  totalPrice: number,
  title: string,
  payerId: number,
  profileImg: Animals,
  nickName: string,
  individual: boolean,
  getExpenseDetails: ExpenseAssignee[]
}
