import React from 'react';
import styled from '@emotion/styled';

import { basicWrap } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
// import { useGetCalculateDetail } from 'hooks/data/useExpense';
// import { useQueryString } from 'utils';
import { Caption } from 'styles/typography';
import { CalculateDetails, GiveOrTake } from 'model/expense';
import { Animals } from 'components/profile';
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

const SummarySection = styled.section`
  height: ${pxToVw(70)};
  background: ${color.grayscale.gray07};
  position: absolute;
  width: 100%;
  left: 0;

  ${mediaQuery(640)} {
    height: 70px;
  }
`;

const DATA: CalculateDetails[] = [
  {
    id: 1,
    me: true,
    nickName: '유진',
    payDate: '21-04-16',
    profileImg: Animals.Rabbit,
    title: '게스트하우스',
    totalPrice: 200000,
    calculateListDetails: [
      {
        nickName: '지형',
        profileImg: Animals.Puppy,
        payDate: '21-04-16',
        payerId: 1,
        type: GiveOrTake.Take,
        userId: 2,
        price: 50000
      },
      {
        nickName: '영진',
        profileImg: Animals.Unicorn,
        payDate: '21-04-16',
        payerId: 1,
        type: GiveOrTake.Take,
        userId: 3,
        price: 50000
      },
      {
        nickName: '주예',
        profileImg: Animals.Hamster,
        payDate: '21-04-16',
        payerId: 1,
        type: GiveOrTake.Take,
        userId: 4,
        price: 50000
      }
    ]
  }
];

export default function Detail() {
  // const tripId = useQueryString().get('tripId');
  // const { data } = useGetCalculateDetail(tripId || '');
  // console.log(data);

  return (
    <Wrap>
      <SummarySection>받을 돈 갚을 돈</SummarySection>
      <List>
        {DATA?.map(({ nickName, id, totalPrice, payDate, title, profileImg, me, calculateListDetails }) => (
          <>
            <Text>{payDate}</Text>
            <Log key={id} expender={nickName} profile={profileImg} amount={totalPrice} desc={title} isMe={me} />
            {!!calculateListDetails.length && <div>wow</div>}
          </>
        ))}
      </List>
    </Wrap>
  );
}
