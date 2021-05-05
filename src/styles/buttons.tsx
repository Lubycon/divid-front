import { css } from '@emotion/react';
import { mediaQuery, calcSize } from './media';

export const squareButton = css`
  width: ${calcSize(295)};
  height: ${calcSize(58)};
  border-radius: ${calcSize(8)};
  font-size: ${calcSize(16)};
  font-weight: bold;
  outline: none;
  border: none;

  ${mediaQuery(640)} {
    width: 560px;
    height: 58px;
    border-radius: 8px;
    font-size: 16px;
  }
`;
