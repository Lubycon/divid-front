import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { Link } from 'react-router-dom';
import { mediaQuery, pxToVw } from 'styles/media';
import { Heading } from 'styles/typography';
import { Caption as CommonCaption } from 'styles/typography';
import { flexAlignCenter } from 'styles/containers';
import Button, { ButtonType } from 'components/button';

const Section = styled.div`
  background: ${color.grayscale.gray07};
  display: flex;
  justify-content: center;
  height: ${pxToVw(220)};

  ${mediaQuery(640)} {
    height: 140px;
  }
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  padding: ${pxToVw(32)} ${pxToVw(24)};

  ${mediaQuery(640)} {
    width: 1200px;
    padding: 37px 0;
  }
`;

export const SubButtonWrap = styled.div`
  margin-bottom: ${pxToVw(35)};
  ${flexAlignCenter};

  ${mediaQuery(640)} {
    margin-top: 5px;
    margin-bottom: 16px;
  }
`;

export const Caption = styled(CommonCaption)`
  color: ${color.grayscale.gray03};
`;

export const Divider = styled.div`
  width: 1px;
  height: ${pxToVw(16)};
  background-color: ${color.grayscale.gray05};
  margin: 0 ${pxToVw(16)};

  ${mediaQuery(640)} {
    height: 16px;
    margin: 0 16px;
  }
`;

const RightsNotice = styled(Heading)`
  font-weight: 400;
  color: ${color.grayscale.gray04};
  margin: ${pxToVw(36)} 0;
  font-size: ${pxToVw(14)};

  ${mediaQuery(640)} {
    font-size: 14px;
    margin: 36px 0;
  }
`;

const LubyconLogo = styled.div`
  right: ${pxToVw(24)};
  bottom: ${pxToVw(60)};
  width: ${pxToVw(80)};
  height: ${pxToVw(25)};
  background: url('/images/logo_lubycon.svg') center no-repeat;
  background-size: contain;
  margin-top: 16px;

  ${mediaQuery(640)} {
    width: 80px;
    height: 25px;
    position: absolute;
    right: 24px;
    bottom: 37px;
  }
`;

export default function Footer() {
  return (
    <Section>
      <Content>
        <SubButtonWrap>
          <Link to="/privacy">
            <Button buttonType={ButtonType.Text}>
              <Caption>개인정보처리방침</Caption>
            </Button>
          </Link>
          <Divider />
          <Link to="/terms">
            <Button buttonType={ButtonType.Text}>
              <Caption>이용약관</Caption>
            </Button>
          </Link>
        </SubButtonWrap>
        <RightsNotice>© 2021. divid. all rights reserved.</RightsNotice>
        <LubyconLogo />
      </Content>
    </Section>
  );
}
