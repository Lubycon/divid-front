import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import { flexAlignCenter } from 'styles/containers';
import color from 'styles/colors';
import Button, { ButtonType } from 'components/button';
import { Heading7 } from 'styles/typography';

const FirstPart = styled.div`
  background: url('/images/bg_img01.svg') center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  height: ${pxToVw(786)};

  ${mediaQuery(640)} {
    height: 980px;
  }
`;

const Content = styled.div`
  width: 100%;
  ${flexAlignCenter};
  position: relative;
  flex-direction: column;

  ${mediaQuery(640)} {
    width: 1200px;
    flex-direction: row;
  }
`;

const InnerWrap = styled.div`
  width: 100%;

  ${mediaQuery(640)} {
    width: auto;
  }
`;

const MobileImg = styled.div`
  width: ${pxToVw(210)};
  height: ${pxToVw(400)};
  background: url('/images/image 134.png') center no-repeat;
  background-size: contain;
  position: absolute;
  top: ${pxToVw(275)};

  ${mediaQuery(640)} {
    width: 380px;
    height: 724.5px;
    margin-left: 100px;
    position: static;
    top: auto;
  }
`;

const Heading = styled.h1`
  font-family: 'NanumSquare', sans-serif;
  line-height: 1.5;
  color: ${color.black};
  font-size: ${pxToVw(32)};
  font-weight: 300;
  margin: 82px 0 0 24px;

  span {
    font-weight: 800;
  }

  ${mediaQuery(640)} {
    font-size: 60px;
    margin: 0 0 0 76px;
  }
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

const SwagImg = styled.div`
  width: ${pxToVw(142)};
  height: ${pxToVw(166)};
  background: url('/images/Frame 880.svg') center no-repeat;
  background-size: contain;
  position: absolute;
  bottom: 0;
  right: 0;

  ${mediaQuery(640)} {
    width: 226px;
    height: 210px;
  }
`;

export const CustomButton = styled(Button)`
  padding: 0 20px;
  width: ${pxToVw(132)};
  height: ${pxToVw(50)};
  border-radius: 100px;
  margin: 16px 0 0 24px;

  ${mediaQuery(640)} {
    padding: 0 32px;
    width: 164px;
    margin: 30px 0 189px 76px;
  }
`;

export default function FirstSection() {
  return (
    <FirstPart>
      <Content>
        <MobileImg />
        <InnerWrap>
          <Heading>
            복잡한{' '}
            <span>
              여행정산, <br />
              디빗
            </span>
            으로 <span>한 번에 해결</span>
          </Heading>
          <CustomButton buttonType={ButtonType.Square}>
            <Label>지금 시작하기</Label>
          </CustomButton>
        </InnerWrap>
        <SwagImg />
      </Content>
    </FirstPart>
  );
}
