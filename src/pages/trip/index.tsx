import React from 'react';
import { Link } from 'react-router-dom';
import { basicWrap, grayBackground } from 'styles/containers';
import FloatingActionButton from 'components/floating-action-button';
import { useQueryString } from 'utils';
import { useGetDetailTripInfo } from 'hooks/data/useTripInfo';
import Join from 'pages/join';
import TripLog from './trip-log';
import Header from './header';

export default function Trip() {
  const tripId = useQueryString().get('tripId');
  const { data, isLoading } = useGetDetailTripInfo(tripId || '');
  console.log(data);

  const RESPONSE_DUMMY = 200;

  if (isLoading || !data) {
    return <div>loading</div>;
  }
  if (RESPONSE_DUMMY !== 200) {
    // 로그인 상태이고, 링크로 접근했으나, 여행에 조인하지 않은 경우
    return <Join />;
  }

  return (
    <div css={[basicWrap, grayBackground]}>
      <Header trip={data} />
      <TripLog trip={data} />
      <Link to={`/expense?tripId=${tripId}`}>
        <FloatingActionButton />
      </Link>
    </div>
  );
}
