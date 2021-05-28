import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'styles/media';
import { basicWrap, blueBackground } from 'styles/containers';
import { Heading3 } from 'styles/typography';
import color from 'styles/colors';
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
  return (
    <Wrap>
      <Title>
        divid로 여행정산을
        <br />
        쉽게 해결하세요
      </Title>
      <TripContainer />
    </Wrap>
  );
}
