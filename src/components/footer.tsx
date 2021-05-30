import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { grayBackground } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import { Heading7, Heading } from 'styles/typography';
import { Caption as CommonCaption } from 'styles/typography';
import { flexAlignCenter } from 'styles/containers';
import Button, { ButtonType } from 'components/button';
import color from 'styles/colors';

const FooterWrap = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${grayBackground};
  padding: ${pxToVw(24)};

  ${mediaQuery(640)} {
    padding: 24px;
  }
`;

const ButtonLabel = styled(Heading7)`
  display: inline-block;
  padding: ${pxToVw(13)} 0;

  ${mediaQuery(640)} {
    padding: 13px 0;
  }
`;

export const SubButtonWrap = styled.div`
  ${flexAlignCenter};
  margin-top: 12px;
  margin-bottom: 4px;
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
  font-size: 12px;
  margin: 36px 0;
`;

export default function Footer() {
  return (
    <FooterWrap>
      <ButtonLabel>디빗에 대하여</ButtonLabel>
      <ButtonLabel>건의하기</ButtonLabel>
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
    </FooterWrap>
  );
}
