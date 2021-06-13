import React from 'react';
import styled from '@emotion/styled';
// import { flexAlignCenter } from 'styles/containers';
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

  ${mediaQuery(640)} {
    height: 140px;
  }
`;

const Content = styled.div`
  width: 100%;
  position: relative;

  ${mediaQuery(640)} {
    width: 1200px;
    padding: 37px 0;
  }
`;

export const SubButtonWrap = styled.div`
  ${flexAlignCenter};
  margin-top: 5px;
  margin-bottom: 16px;
`;

export const Caption = styled(CommonCaption)`
  color: ${color.grayscale.gray03};
`;

export const Divider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${color.grayscale.gray05};
  margin: 0 16px;
`;

const RightsNotice = styled(Heading)`
  font-weight: 400;
  color: ${color.grayscale.gray04};
  font-size: 14px;
  margin: ${pxToVw(36)} 0;

  ${mediaQuery(640)} {
    margin: 36px 0;
  }
`;

const LubyconLogo = styled.div`
  position: absolute;
  right: ${pxToVw(24)};
  bottom: ${pxToVw(60)};
  width: 80px;
  height: 25px;
  background: url('/images/logo_lubycon.svg') center no-repeat;
  background-size: contain;

  ${mediaQuery(640)} {
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
