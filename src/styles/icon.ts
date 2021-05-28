import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';

export const ArrowRight = styled.span<{ theme?: string }>`
  display: inline-block;
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  background: url('/images/arrow_right.svg') center no-repeat;
  background-size: contain;
  color: ${({ theme }) => theme || color.grayscale.gray01};

  ${mediaQuery(640)} {
    width: 24px;
    height: 24px;
  }
`;

export const ArrowLeft = styled.span<{ theme?: string }>`
  display: inline-block;
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  background: url('/images/arrow_left.svg') center no-repeat;
  background-size: contain;
  color: ${({ theme }) => theme || color.grayscale.gray01};

  ${mediaQuery(640)} {
    width: 24px;
    height: 24px;
  }
`;

export const ArrowDown = styled.span<{ theme?: string }>`
  display: inline-block;
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  background: url('/images/arrow_down.svg') center no-repeat;
  background-size: contain;
  color: ${({ theme }) => theme || color.grayscale.gray01};

  ${mediaQuery(640)} {
    width: 24px;
    height: 24px;
  }
`;

export const Menu = styled.span<{ theme?: string }>`
  display: inline-block;
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  background: url('/images/ico_menu.svg') center no-repeat;
  background-size: contain;
  color: ${({ theme }) => theme || color.grayscale.gray01};

  ${mediaQuery(640)} {
    width: 24px;
    height: 24px;
  }
`;

export const Close = styled.span<{ theme?: string }>`
  display: inline-block;
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  background: url('/images/ico_close.svg') center no-repeat;
  background-size: contain;
  color: ${({ theme }) => theme || color.grayscale.gray01};

  ${mediaQuery(640)} {
    width: 24px;
    height: 24px;
  }
`;
