import { css } from '@emotion/react';
import { mediaQuery, calcSize } from './media';

export const title1 = css`
  font-weight: bold;
  font-size: ${calcSize(32)};
  text-align: center;
  line-height: 1.3;

  ${mediaQuery(640)} {
    font-size: 32px;
  }
`;
