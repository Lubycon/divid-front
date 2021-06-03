import { MemberInfo } from './members'

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