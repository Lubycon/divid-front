import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';

import { Link, useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import { Heading7 as Title } from 'styles/typography';
import { flexCenter } from 'styles/containers';
import { getPageInfo, useHeaderOptionalButton, useScroll, isProjectsPage } from 'utils';
import color from 'styles/colors';

const Wrap = styled.div<{ isScrolled: boolean }>`
  ${flexCenter}
  height: ${pxToVw(58)};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color ease-in-out 0.2s;
  transition: box-shadow ease-in-out 0.2s;
  z-index: 10;
  width: 100%;

  ${({ isScrolled }) => (isScrolled ? scrolled : unscrolled)};

  ${mediaQuery(640)} {
    height: 58px;
    margin: 0 auto;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  height: ${pxToVw(58)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQuery(640)} {
    height: 58px;
    width: 640px;
    margin: 0 auto;
  }
`;
const scrolled = css`
  background-color: ${color.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
`;
const unscrolled = css`
  background-color: transparent;
  box-shadow: none;
`;

const Icon = styled.div`
  width: ${pxToVw(44)};
  height: ${pxToVw(44)};
  background-size: contain;
  position: absolute;
  left: ${pxToVw(20)};

  ${mediaQuery(640)} {
    width: 44px;
    height: 44px;
    left: 20px;
  }
`;

const Logo = styled.div`
  width: ${pxToVw(100)};
  height: ${pxToVw(30)};
  background: url('/images/logo_section.svg') no-repeat center;
  background-size: contain;

  ${mediaQuery(640)} {
    width: 100px;
    height: 30px;
  }
`;

const LogoLink = styled(Link)`
  width: ${pxToVw(60)};
  height: ${pxToVw(30)};
  position: absolute;
  left: ${pxToVw(20)};

  ${mediaQuery(640)} {
    width: 60px;
    height: 30px;
    left: 20px;
  }
`;

const BackButton = styled(Icon)`
  background: url('/images/ico_back.svg') center no-repeat;
  cursor: pointer;
`;

const OptionalButton = styled(Link)`
  position: absolute;
  right: ${pxToVw(20)};
  text-decoration: none;

  ${mediaQuery(640)} {
    right: 20px;
  }
`;

const ButtonLabel = styled(Title)`
  color: ${color.grayscale.gray03};
`;

export default function Header() {
  const isScrolled = useScroll();
  const title = getPageInfo();
  const button = useHeaderOptionalButton();
  const history = useHistory();

  return (
    <Wrap isScrolled={isScrolled}>
      <HeaderContainer>
        {isProjectsPage() ? (
          <LogoLink to="/projects">
            <Logo />
          </LogoLink>
        ) : (
          <BackButton
            onClick={() => {
              if (window.location.href.includes('/trips')) {
                history.push('/projects');
              } else {
                window.history.back();
              }
            }}
          />
        )}
        {title && <Title>{title}</Title>}
        {button && (
          <OptionalButton to={button.link}>
            <ButtonLabel>{button.label}</ButtonLabel>
          </OptionalButton>
        )}
      </HeaderContainer>
    </Wrap>
  );
}
