import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from './media';
import color from './colors';

export const Heading = styled.p`
  font-family: 'NanumSquare', sans-serif;
  line-height: 1.5;
  color: ${color.grayscale.gray01};
`;

export const Heading1 = styled(Heading)`
  font-size: ${pxToVw(45)};
  font-weight: 800;

  ${mediaQuery(640)} {
    font-size: 45px;
  }
`;

export const Heading2 = styled(Heading)`
  font-size: ${pxToVw(32)};
  font-weight: 800;

  ${mediaQuery(640)} {
    font-size: 32px;
  }
`;

export const Heading3 = styled(Heading)`
  font-size: ${pxToVw(28)};
  font-weight: 800;

  ${mediaQuery(640)} {
    font-size: 28px;
  }
`;

export const Heading4 = styled(Heading)`
  font-size: ${pxToVw(20)};
  font-weight: 800;

  ${mediaQuery(640)} {
    font-size: 20px;
  }
`;

export const Heading5 = styled(Heading)`
  font-size: ${pxToVw(18)};
  font-weight: 800;

  ${mediaQuery(640)} {
    font-size: 18px;
  }
`;

export const Heading6 = styled(Heading)`
  font-size: ${pxToVw(18)};
  font-weight: 700;

  ${mediaQuery(640)} {
    font-size: 18px;
  }
`;

export const Heading7 = styled(Heading)`
  font-size: ${pxToVw(16)};
  font-weight: 700;

  ${mediaQuery(640)} {
    font-size: 16px;
  }
`;

export const Body1 = styled.p`
  font-size: ${pxToVw(26)};
  font-weight: 500;
  line-height: 1.5;

  ${mediaQuery(640)} {
    font-size: 26px;
  }
`;

export const Body2 = styled.p`
  font-size: ${pxToVw(20)};
  font-weight: 500;
  line-height: 1.5;

  ${mediaQuery(640)} {
    font-size: 20px;
  }
`;

export const Body3 = styled.p`
  font-size: ${pxToVw(18)};
  font-weight: 500;
  line-height: 1.5;

  ${mediaQuery(640)} {
    font-size: 18px;
  }
`;

export const Body4 = styled.p`
  font-size: ${pxToVw(16)};
  font-weight: 400;
  line-height: 1.5;

  ${mediaQuery(640)} {
    font-size: 16px;
  }
`;

export const CaptionTitle = styled.h3`
  font-size: ${pxToVw(18)};
  font-weight: 600;
  line-height: 1.5;

  ${mediaQuery(640)} {
    font-size: 18px;
  }
`;

export const CaptionBold = styled.p`
  font-size: ${pxToVw(14)};
  font-weight: 600;
  line-height: 1.5;

  ${mediaQuery(640)} {
    font-size: 14px;
  }
`;

export const Caption = styled.p`
  font-size: ${pxToVw(14)};
  font-weight: 400;
  line-height: 1.5;

  ${mediaQuery(640)} {
    font-size: 14px;
  }
`;

export const Badge = styled.span`
  font-size: ${pxToVw(12)};
  font-weight: 500;

  ${mediaQuery(640)} {
    font-size: 12px;
  }
`;
