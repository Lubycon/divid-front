import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from './media';

export const basicWrap = css`
  width: 100%;
  padding: ${pxToVw(66)} ${pxToVw(40)};
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