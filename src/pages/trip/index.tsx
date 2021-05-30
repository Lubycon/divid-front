import React from 'react';
import { Link } from 'react-router-dom';
import { basicWrap, grayBackground } from 'styles/containers';
import FloatingActionButton from 'components/floating-action-button';
import { TripInfo, Animals } from 'api/types';
import Join from 'pages/join';
import TripLog from './trip-log';
import Header from './header';

const DUMMY: TripInfo = {
  tripId: '244ba584-099d-4eb3-954e-0766132ac9e1',
  tripName: '강원도 우정여행',
  inviteCode: 75,
  startDate: '2021-05-25',
  endDate: '2021-06-30',
  userInfoResponseList: [
    { userId: 2, nickName: '지형', profile: Animals.Bear, me: true },
    { userId: 3, nickName: '주예', profile: Animals.Unicorn, me: false }
  ]
};

export default function Trip() {
  const RESPONSE_DUMMY = 200;

  if (RESPONSE_DUMMY !== 200) {
    // 로그인 상태이고, 링크로 접근했으나, 여행에 조인하지 않은 경우
    return <Join />;
  }

  return (
    <div css={[basicWrap, grayBackground]}>
      <Header trip={DUMMY} />
      <TripLog trip={DUMMY} />
      <Link to="/expense">
        <FloatingActionButton />
      </Link>
    </div>
  );
}
