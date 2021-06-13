import React from 'react';
import { useGetExpenseAll } from 'hooks/data/useExpense';
import styled from '@emotion/styled';
import { Caption } from 'styles/typography';
import { flexAlignCenter } from 'styles/containers';
import { numberWithCommas } from 'utils';
import color from 'styles/colors';
import Log from './log';

const Wrap = styled.div`
  margin-top: 24px;
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
  const { data } = useGetExpenseAll(tripId);

  if (!data) {
    <div>loading</div>;
  }

  console.log(data);
  return (
    <Wrap>
      {data?.map((el, i) => (
        <>
          <CaptionWrap>
            <Text>{el.payDate}</Text>
            {i === 0 ? (
              <Text>총 {data?.[0].tripTotalPrice !== undefined && numberWithCommas(data?.[0].tripTotalPrice)}원</Text>
            ) : null}
          </CaptionWrap>
          {el.detailResponses.map(({ nickName, expenseId, totalPrice, title, profileImg, me }) => (
            <Log key={expenseId} expender={nickName} profile={profileImg} amount={totalPrice} desc={title} isMe={me} />
          ))}
        </>
      ))}
    </Wrap>
  );
}
