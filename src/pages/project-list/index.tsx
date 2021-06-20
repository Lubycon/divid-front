import React, { useEffect } from 'react';
import { getLocalStorage } from 'utils';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import { basicWrap } from 'styles/containers';
import { Heading4 } from 'styles/typography';
import { useGetTripLists } from 'hooks/data/useTripInfo';
import useTooltip from 'hooks/useTooltip';
import { Tooltip } from 'components/modal/tooltip';
import Loading from 'pages/loading';
import Empty from './empty';
import Card from './card';
import Welcome from './hello-message';

const Title = styled(Heading4)`
  margin: 16px 0;
`;

export default function ProjectList() {
  const { data, isLoading } = useGetTripLists();
  const currentTrip = data?.filter((trip) => !trip.end);
  const pastTrip = data?.filter((trip) => trip.end);

  const { handleOpen: openCreateTooltip, renderModal: renderCreateTooltip } = useTooltip({
    children: (
      <Tooltip
        text="버튼을 눌러 여행을 만들어보세요!"
        position={css`
          top: ${pxToVw(65)};
          right: ${pxToVw(24)};
          ${mediaQuery(640)} {
            top: 70px;
            right: 25px;
          }
        `}
        trianglePosition={15}
      />
    ),
    type: 'create-trip'
  });

  useEffect(() => {
    if (!getLocalStorage('create-trip')) {
      openCreateTooltip();
    }
  }, [isLoading]);

  if (isLoading) {
    <Loading />;
  }

  if (!isLoading && data && data.length === 0) {
    return (
      <div css={basicWrap}>
        <Welcome />
        <Empty />
      </div>
    );
  }

  return (
    <>
      {renderCreateTooltip()}
      <div css={basicWrap}>
        <Welcome />
        {currentTrip && currentTrip.length > 0 ? (
          <>
            <Title>여행 중</Title>
            {currentTrip.map(({ tripId, tripName, startDate, endDate, memberCnt, userInfoResponseList, end }) => (
              <Card
                key={tripId}
                tripId={tripId}
                tripName={tripName}
                startDate={startDate}
                endDate={endDate}
                memberCnt={memberCnt}
                members={userInfoResponseList}
                isCurrent={!end}
              />
            ))}
          </>
        ) : null}
        {pastTrip && pastTrip.length > 0 ? (
          <>
            <Title>모든 여행</Title>
            {pastTrip.map(({ tripId, tripName, startDate, endDate, memberCnt, userInfoResponseList, end }) => (
              <Card
                key={tripId}
                tripId={tripId}
                tripName={tripName}
                startDate={startDate}
                endDate={endDate}
                memberCnt={memberCnt}
                members={userInfoResponseList}
                isCurrent={!end}
              />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
