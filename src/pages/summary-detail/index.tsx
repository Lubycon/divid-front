import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { basicWrap, flexAlignCenter, flexCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
import { useGetDetailTripInfo } from 'hooks/data/useTripInfo';
import { useGetCalculateDetail } from 'hooks/data/useExpense';
import { useQueryString } from 'utils';
import { Caption, Heading7, Heading5 } from 'styles/typography';
import { numberWithCommas } from 'utils';
import Loading from 'pages/loading';
import Log from './log';

const Wrap = styled.div`
  ${basicWrap};
  position: relative;
`;

const List = styled.div`
  margin-top: ${pxToVw(100)};

  ${mediaQuery(640)} {
    margin-top: 100px;
  }
`;

const Text = styled(Caption)`
  color: ${color.grayscale.gray03};
  margin-bottom: 12px;
`;

const AmountTitle = styled(Text)`
  margin-bottom: 0;
`;

const SummarySection = styled.section`
  height: ${pxToVw(70)};
  background: ${color.grayscale.gray07};
  position: absolute;
  width: 100%;
  left: 0;
  ${flexAlignCenter};

  ${mediaQuery(640)} {
    height: 70px;
  }
`;

const Summary = styled.div`
  flex: 1;
  ${flexCenter};
  flex-direction: column;
`;

const Amount = styled(Heading7)`
  color: ${color.grayscale.gray03};
`;

const PointColor = styled(Heading5)``;

const Divider = styled.div`
  height: ${pxToVw(32)};
  width: 1px;
  background-color: ${color.grayscale.gray05};

  ${mediaQuery(640)} {
    height: 32px;
    width: 2px;
  }
`;

export default function Detail() {
  const tripId = useQueryString().get('tripId');
  const { data } = useGetCalculateDetail(tripId || '');
  const { data: tripInfo } = useGetDetailTripInfo(tripId || '');
  console.log(tripInfo);

  if (!data || !tripInfo) {
    return <Loading />;
  }

  return (
    <Wrap>
      <SummarySection>
        <Summary>
          <AmountTitle>받을 돈</AmountTitle>
          <Amount>
            <PointColor
              css={css`
                color: ${color.green};
              `}
            >
              {numberWithCommas(tripInfo.amountResponse.takeAmount)}
            </PointColor>{' '}
            원
          </Amount>
        </Summary>
        <Divider />
        <Summary>
          <AmountTitle>갚을 돈</AmountTitle>
          <Amount>
            <PointColor
              css={css`
                color: ${color.red};
              `}
            >
              {numberWithCommas(tripInfo.amountResponse.giveAmount)}
            </PointColor>{' '}
            원
          </Amount>
        </Summary>
      </SummarySection>
      <List>
        {data &&
          data?.map((day, i) => (
            <React.Fragment key={i + day.payDate}>
              <Text>{day.payDate}</Text>
              {day?.calculateListDetails?.map(
                ({ nickName, totalPrice, title, profileImg, me, calculateListDetails }, idx) => (
                  <Log
                    key={idx}
                    expender={nickName}
                    profile={profileImg}
                    amount={totalPrice}
                    desc={title}
                    isMe={me}
                    calculateListDetails={calculateListDetails}
                  />
                )
              )}
            </React.Fragment>
          ))}
      </List>
    </Wrap>
  );
}
