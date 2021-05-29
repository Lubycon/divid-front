import React, { useState } from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';

import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Heading7 as Title } from 'styles/typography';
import { flexCenter } from 'styles/containers';
import { getPageInfo, getHeaderButton, isHome, useScroll } from 'utils';
import color from 'styles/colors';
import Modal from 'components/modal';
import Navigation from './navigation';

const Wrap = styled.div<{ isScrolled: boolean }>`
  ${flexCenter}
  height: ${pxToVw(58)};
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color ease-in-out 0.2s;
  transition: box-shadow ease-in-out 0.2s;
  z-index: 1000;

  ${({ isScrolled }) => (isScrolled ? scrolled : unscrolled)};

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

const Hamburger = styled(Icon)`
  background: url('/images/ico_menu.svg') center no-repeat;
`;

const BackButton = styled(Icon)`
  background: url('/images/ico_back.svg') center no-repeat;
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
  const [isToggleHamburger, setIsToggleHamburger] = useState(false);
  const isScrolled = useScroll();
  const title = getPageInfo();
  const button = getHeaderButton();

  return (
    <>
      <Wrap isScrolled={isScrolled}>
        {isHome() ? (
          <Hamburger onClick={() => setIsToggleHamburger(true)} />
        ) : (
          <BackButton
            onClick={() => {
              window.history.back();
            }}
          />
        )}
        {isToggleHamburger ? (
          <Navigation isNaviOpened={isToggleHamburger} onRequestClose={() => setIsToggleHamburger(false)} />
        ) : null}
        {title && <Title>{title}</Title>}
        {button && (
          <OptionalButton to={button.link}>
            <ButtonLabel>{button.label}</ButtonLabel>
          </OptionalButton>
        )}
      </Wrap>

      {/* 공통 모달 */}
      <Modal />
    </>
  );
}
