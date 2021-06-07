import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { basicWrap, grayBackground } from 'styles/containers';
import FloatingActionButton from 'components/floating-action-button';
import { Animals } from 'api/types';
import { useQueryString } from 'utils';
import { useGetDetailTripInfo } from 'hooks/data/useTripInfo';
import { TripInfo } from 'model/trip';
import Join from 'pages/join';
import TripLog from './trip-log';
import Header from './header';

const DUMMY: TripInfo = {
  tripId: '244ba584-099d-4eb3-954e-0766132ac9e1',
  tripName: '강원도 우정여행',
  inviteCode: 75,
  startDate: '2021-05-25',
  endDate: '2021-06-30',
  end: false,
  memberCnt: 2,
  userInfoResponseList: [
    { userId: 2, nickName: '지형', profileImg: Animals.Bear, me: true },
    { userId: 3, nickName: '주예', profileImg: Animals.Unicorn, me: false }
  ]
};

export default function Trip() {
  const tripId = useQueryString().get('tripId');
  console.log(tripId);
  const { data, isLoading } = useGetDetailTripInfo(tripId || '');
  console.log(data);
  useEffect(() => {
    console.log('mounted');
  }, []);

  const RESPONSE_DUMMY = 200;

  if (isLoading) {
    return <div>loading</div>;
  }
  if (RESPONSE_DUMMY !== 200) {
    // 로그인 상태이고, 링크로 접근했으나, 여행에 조인하지 않은 경우
    return <Join />;
  }

  return (
    <div css={[basicWrap, grayBackground]}>
      <Header trip={DUMMY} />
      <TripLog trip={DUMMY} />
      <Link to={`/expense?tripId=${tripId}`}>
        <FloatingActionButton />
      </Link>
    </div>
  );
}
