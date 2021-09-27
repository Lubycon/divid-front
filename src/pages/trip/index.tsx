import React from 'react';
import { useHistory } from 'react-router-dom';
import { basicWrap, grayBackground } from 'styles/containers';
import { useQueryString, isError } from 'utils';
import { useGetDetailTripInfo } from 'hooks/data/useTripInfo';
import Loading from 'pages/loading';
import TripLog from './trip-log';
import Header from './header';

export default function Trip() {
  const history = useHistory();
  const tripId = useQueryString().get('tripId');
  const { data, isLoading, error } = useGetDetailTripInfo(tripId || '');

  if (isError(error)) {
    if (
      error.message === 'Request failed with status code 404' ||
      error.message === 'Request failed with status code 500'
    ) {
      history.push('/notFound');
    }
    if (error.message === 'Request failed with status code 403') {
      history.push(`/join?tripId=${tripId}`);
    }
    if (error.message === 'Request failed with status code 400') {
      history.push(`/login?tripId=${tripId}`);
    }
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div css={[basicWrap, grayBackground]}>
      <Header trip={data} />
      <TripLog trip={data} tripId={tripId ?? ''} />
    </div>
  );
}
