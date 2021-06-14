import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { basicWrap, grayBackground } from 'styles/containers';
import FloatingActionButton from 'components/floating-action-button';
import { useQueryString } from 'utils';
import { useGetDetailTripInfo } from 'hooks/data/useTripInfo';
import Loading from 'pages/loading';
import Join from 'pages/join';
import TripLog from './trip-log';
import Header from './header';

export default function Trip() {
  const history = useHistory();
  const tripId = useQueryString().get('tripId');
  const { data, isLoading, status, error } = useGetDetailTripInfo(tripId || '');
  console.log(data);
  console.log(status);

  function isError(errorParam: unknown): errorParam is Error {
    return errorParam instanceof Error;
  }

  const RESPONSE_DUMMY = 200;

  if (isError(error)) {
    if (error.message === 'Request failed with status code 403') {
      history.push('/notFound');
    }
    console.log(error.message);
  }

  if (isLoading || !data) {
    return <Loading />;
  }
  if (RESPONSE_DUMMY !== 200) {
    // 로그인 상태이고, 링크로 접근했으나, 여행에 조인하지 않은 경우
    return <Join />;
  }

  return (
    <div css={[basicWrap, grayBackground]}>
      <Header trip={data} />
      <TripLog trip={data} tripId={tripId ?? ''} />
      <Link to={`/expense?tripId=${tripId}`}>
        <FloatingActionButton />
      </Link>
    </div>
  );
}
