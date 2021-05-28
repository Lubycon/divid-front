import React from 'react';
import styled from '@emotion/styled';
import { basicWrap, blueBackground } from 'styles/containers';
import { Heading3 } from 'styles/typography';
import color from 'styles/colors';
import TripContainer from './trip-container';

const Title = styled(Heading3)`
  color: ${color.white};
  text-align: center;
`;

export default function Join() {
  return (
    <div css={[basicWrap, blueBackground]}>
      <Title>
        divid로 여행정산을
        <br />
        쉽게 해결하세요
      </Title>
      <TripContainer />
    </div>
  );
}
