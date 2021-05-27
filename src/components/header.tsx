import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Heading7 as Title } from 'styles/typography';
import { flexCenter } from 'styles/containers';
import { getPageInfo, getHeaderButton, useScroll } from 'utils';
import color from 'styles/colors';
import Navigation from './navigation';

const Wrap = styled.div<{ isScrolled: boolean }>`
  ${flexCenter}
  height: 58px;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color ease-in-out 0.2s;
  transition: box-shadow ease-in-out 0.2s;

  ${({ isScrolled }) => (isScrolled ? scrolled : unscrolled)};
`;

const scrolled = css`
  background-color: ${color.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
`;
const unscrolled = css`
  background-color: transparent;
  box-shadow: none;
`;

const Hamburger = styled.div`
  width: 44px;
  height: 44px;
  background: url('/images/ico_menu.svg') center no-repeat;
  background-size: contain;
  position: absolute;
  left: 20px;
`;

const OptionalButton = styled(Title)`
  position: absolute;
  right: 20px;
`;

export default function Header() {
  const [isToggleHamburger, setIsToggleHamburger] = useState(false);
  const isScrolled = useScroll();
  const title = getPageInfo();
  const button = getHeaderButton();
  console.log(button);

  return (
    <Wrap isScrolled={isScrolled}>
      <Hamburger onClick={() => setIsToggleHamburger(true)} />
      {isToggleHamburger ? (
        <Navigation isNaviOpened={isToggleHamburger} onRequestClose={() => setIsToggleHamburger(false)} />
      ) : null}
      {title && <Title>{title}</Title>}
      {button && <OptionalButton onClick={button.onClick}>{button.label}</OptionalButton>}
    </Wrap>
  );
}
