import { css } from '@emotion/react';
import { mediaQuery } from './media';

export const squareButton = css`
  width: 78.6666666667vw;
  height: 15.4666666667vw;
  border-radius: 2.1333333333vw;
  margin-top: 16.8vw;
  font-size: 4.2666666667vw;
  font-weight: bold;
  outline: none;
  border: none;

  ${mediaQuery(640)} {
    width: 560px;
    height: 58px;
    border-radius: 8px;
    margin-top: 126px;
    font-size: 16px;
  }
`;
