import { css } from '@emotion/react';
import { mediaQuery, calcSize } from './media';

export const basicWrap = css`
  width: 100%;
  padding: ${calcSize(66)} ${calcSize(40)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${mediaQuery(640)} {
    width: 640px;
    margin: 0 auto;
    padding: 66px 40px;
  }
`;
