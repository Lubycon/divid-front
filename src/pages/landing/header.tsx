import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';

import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { CaptionBold } from 'styles/typography';
import { flexCenter } from 'styles/containers';
import { useScroll } from 'utils';
import color from 'styles/colors';

const Wrap = styled.div<{ isScrolled: boolean }>`
  ${flexCenter}
  height: ${pxToVw(66)};
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
    height: 66px;
    margin: 0 auto;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${pxToVw(66)};
  width: 100%;

  ${mediaQuery(640)} {
    height: 66px;
    width: 1200px;
    margin: 0 auto;
  }
`;

const Title = styled(CaptionBold)`
  display: inline-block;
`;

const scrolled = css`
  background-color: ${color.white};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
`;

const unscrolled = css`
  background-color: transparent;
  box-shadow: none;
`;

const Logo = styled.div`
  width: ${pxToVw(100)};
  height: ${pxToVw(30)};
  background: url('/images/logo_section.svg') no-repeat center;
  background-size: contain;
  position: absolute;
  left: ${pxToVw(24)};
  cursor: pointer;
  top: ${pxToVw(19)};

  ${mediaQuery(640)} {
    width: 100px;
    height: 30px;
    left: 0;
    top: 19px;
  }
`;

const ButtonLabel = styled(Title)`
  color: ${color.grayscale.gray01};
`;

const ButtonGray = styled.button`
  width: ${pxToVw(70)};
  height: ${pxToVw(40)};
  background-color: #f3f3f3;
  border-radius: 8px;
  border: none;
  outline: none;
  border: 1px solid #eaeaea;
  margin: 0 ${pxToVw(33)} 0 ${pxToVw(18)};

  ${mediaQuery(640)} {
    width: 75px;
    height: 42px;
    margin: 0 0 0 54px;
  }
`;

export default function Header() {
  const isScrolled = useScroll();

  const emailFormat =
    '디빗팀에게 건의하고 싶으신 아이디어가 있으신가요?🙂 %0D%0A자유롭게 메일로 남겨주시면 더 나은 디빗 서비스를 만드는데 큰 도움이 될 것 같아요🌷 %0D%0A— 디빗팀 —';

  return (
    <Wrap isScrolled={isScrolled}>
      <HeaderContainer>
        <Link to="/projects">
          <Logo />
        </Link>
        <div>
          <a
            href={`mailto:4divid.official@gmail.com?body=${emailFormat}&subject=[디빗팀에게 건의하기]&bcc=hyounga9595@gmail.com`}
          >
            <ButtonLabel>건의하기</ButtonLabel>
          </a>
          <Link to="/login">
            <ButtonGray>
              <Title>로그인</Title>
            </ButtonGray>
          </Link>
        </div>
      </HeaderContainer>
    </Wrap>
  );
}
