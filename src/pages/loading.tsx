import React from 'react';
import styled from '@emotion/styled';
import { basicWrap } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import { Heading3 } from 'styles/typography';
import color from 'styles/colors';

const Wrap = styled.div`
  ${basicWrap};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div`
  width: ${pxToVw(300)};
  height: ${pxToVw(272)};
  background: url('/images/img_loading.svg') center no-repeat;
  background-size: contain;

  ${mediaQuery(640)} {
    width: 387px;
    height: 352px;
  }
`;

const Text = styled(Heading3)`
  margin-top: ${pxToVw(24)};
  color: ${color.primary};

  ${mediaQuery(640)} {
    margin-top: 24px;
  }
`;

export default function Loading() {
  return (
    <Wrap>
      <Text>loading...</Text>
      <Img />
    </Wrap>
  );
}
