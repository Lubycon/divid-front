import { css } from '@emotion/react';
import styled from '@emotion/styled';
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

export const Heading = styled.h1`
  font-family: 'NanumSquare', sans-serif;
`;

export const Heading1 = styled(Heading)`
  font-weight: 800;
  font-size: 45px;
`;

export const Heading2 = styled(Heading)`
  font-weight: 800;
  font-size: 32px;
`;

export const Heading3 = styled(Heading)`
  font-weight: 800;
  font-size: 28px;
`;

export const Heading4 = styled(Heading)`
  font-weight: 800;
  font-size: 20px;
`;

export const Heading5 = styled(Heading)`
  font-weight: 800;
  font-size: 18px;
`;

export const Heading6 = styled(Heading)`
  font-weight: 700;
  font-size: 18px;
`;

export const Heading7 = styled(Heading)`
  font-weight: 700;
  font-size: 16px;
`;

export const Body1 = styled.p`
  font-weight: 500;
  font-size: 26px;
`;

export const Body2 = styled.p`
  font-weight: 500;
  font-size: 20px;
`;

export const Body3 = styled.p`
  font-weight: 400;
  font-size: 18px;
`;

export const Body4 = styled.p`
  font-weight: 400;
  font-size: 16px;
`;

export const caption_title = styled.h3`
  font-weight: 600;
  font-size: 18px;
`;

export const caption_bold = styled.p`
  font-weight: 600;
  font-size: 14px;
`;

export const caption = styled.p`
  font-weight: 400;
  font-size: 14px;
`;

export const badge = styled.span`
  font-weight: 500;
  font-size: 14px;
`;
