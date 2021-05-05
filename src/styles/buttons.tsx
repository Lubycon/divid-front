import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from './media';

export const squareButton = css`
  width: ${pxToVw(295)};
  height: ${pxToVw(58)};
  border-radius: ${pxToVw(8)};
  font-size: ${pxToVw(16)};
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
