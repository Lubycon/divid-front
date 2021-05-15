import React from 'react';
import { css } from '@emotion/react';
import { basicWrap, flexCenter } from 'styles/containers';
import { Caption } from 'styles/typography';
import color from 'styles/colors';

const emptyBackground = css`
  width: 160px;
  height: 148px;
  background: url('./images/empty_page.png') center no-repeat;
  background-size: contain;
`;

export default function Empty() {
  return (
    <div css={[basicWrap, flexCenter]}>
      <div css={emptyBackground} />
      <Caption
        css={css`
          text-align: center;
          color: ${color.grayscale.gray03};
        `}
      >
        아직 여행이 없어요.
        <br />
        상단의 여행 추가를 눌러 여행을 만들어보세요.
      </Caption>
    </div>
  );
}
