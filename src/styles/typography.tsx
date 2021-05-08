import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from './media';

export const title1 = css`
  font-weight: bold;
  font-size: ${pxToVw(32)};
  text-align: center;
  line-height: 1.3;

  ${mediaQuery(640)} {
    font-size: 32px;
  }
`;
