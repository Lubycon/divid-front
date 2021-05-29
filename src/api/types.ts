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

export interface MemberInfo {
  userId: number;
  nickName: string;
  profile: Animals;
  me: boolean;
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
