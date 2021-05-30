import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCheckDesktop } from 'utils';

import { flexCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import { Caption, Body3 } from 'styles/typography';
import color from 'styles/colors';

const EmptyWrap = styled.div`
  ${flexCenter};
  flex-direction: column;
  margin-top: ${pxToVw(124)};

  ${mediaQuery(640)} {
    margin-top: 200px;
  }
`;

const EmptyImg = styled.div`
  width: 160px;
  height: 148px;
  background: url('./images/empty_page.png') center no-repeat;
  background-size: contain;
`;

export default function Empty() {
  const Description = useCheckDesktop() ? Body3 : Caption;

  return (
    <EmptyWrap>
      <EmptyImg />
      <Description
        css={css`
          text-align: center;
          color: ${color.grayscale.gray03};
        `}
      >
        아직 여행이 없어요.
        <br />
        상단의 여행 추가를 눌러 여행을 만들어보세요.
      </Description>
    </EmptyWrap>
  );
}
