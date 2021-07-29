import React from 'react';
import { useGetCalculateDetail } from 'hooks/data/useExpense';
import styled from '@emotion/styled';
import { Caption } from 'styles/typography';
import { flexAlignCenter } from 'styles/containers';
// import { numberWithCommas } from 'utils';
import Loading from 'pages/loading';
import color from 'styles/colors';
import Log from './log';

const Wrap = styled.div`
  margin-top: 27px;
`;

const Text = styled(Caption)`
  color: ${color.grayscale.gray03};
`;

const CaptionWrap = styled.div`
  ${flexAlignCenter};
  justify-content: space-between;
  margin-bottom: 12px;
  margin-top: 21px;
`;

export default function LogList({ tripId }: { tripId: string }) {
  const { data } = useGetCalculateDetail(tripId || '');

  if (!data) {
    <Loading />;
  }

  return (
    <Wrap>
      {data?.map((el, i) => (
        <React.Fragment key={el.payDate}>
          <CaptionWrap>
            <Text>{el.payDate}</Text>
            {/* {i === 0 ? (
              <Text>총 {data?.[0].tripTotalPrice !== undefined && numberWithCommas(data?.[0].tripTotalPrice)}원</Text>
            ) : null} */}
          </CaptionWrap>
          {el.calculateListDetails.map(
            ({ nickName, id, totalPrice, title, profileImg, me, calculateListDetails }, index) => (
              <Log
                key={index}
                expenseId={id}
                tripId={tripId}
                expender={nickName}
                profile={profileImg}
                amount={totalPrice}
                desc={title}
                isMe={me}
                details={calculateListDetails}
              />
            )
          )}
        </React.Fragment>
      ))}
    </Wrap>
  );
}
