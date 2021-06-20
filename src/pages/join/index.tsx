import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'styles/media';
import { basicWrap, blueBackground } from 'styles/containers';
import { Heading3 } from 'styles/typography';
import color from 'styles/colors';
import Loading from 'pages/loading';
import { useQueryString } from 'utils';
import { useGetGuestTrip } from 'hooks/data/useTripInfo';
import TripContainer from './trip-container';

const Wrap = styled.div`
  ${basicWrap};
  ${blueBackground};

  ${mediaQuery(640)} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled(Heading3)`
  color: ${color.white};
  text-align: center;
`;

export default function Join() {
  const tripId = useQueryString().get('tripId');
  const { refetch, data } = useGetGuestTrip(tripId || '');

  useEffect(() => {
    refetch();
  }, [tripId]);

  console.log(data);

  if (!data) {
    return <Loading />;
  }

  return (
    <Wrap>
      <Title>
        divid로 여행정산을
        <br />
        쉽게 해결하세요
      </Title>
      <TripContainer trip={data} tripId={tripId} />
    </Wrap>
  );
}
