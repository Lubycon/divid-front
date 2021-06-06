import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { Link } from 'react-router-dom';
import { Heading } from 'styles/typography';
import { flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import Profile, { IconSize, Animals } from 'components/profile';

const Wrap = styled.div`
  ${flexAlignCenter}
  padding: ${pxToVw(24)} 0 ${pxToVw(16)};

  ${mediaQuery(640)} {
    padding: 24px 0 16px;
  }
`;

const Title = styled(Heading)`
  margin-left: ${pxToVw(8)};
  margin-right: ${pxToVw(2)};
  font-size: ${pxToVw(24)};
  font-weight: 700;
  position: relative;
  word-break: keep-all;

  ${mediaQuery(640)} {
    margin-left: 8px;
    margin-right: 2px;
    font-size: 24px;
    font-weight: 800;
  }

  span {
    color: ${color.primary};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: ${pxToVw(7)};
    width: ${pxToVw(24)};
    height: ${pxToVw(24)};
    background: url('/images/arrow_right.svg') center no-repeat;
    background-size: contain;

    ${mediaQuery(640)} {
      bottom: 7px;
      width: 24px;
      height: 24px;
    }
  }
`;

export default function Welcome() {
  return (
    <Link to="/mypage">
      <Wrap>
        <Profile iconSize={IconSize.LG} type={Animals.Hamster} />
        <Title>
          <span>디비디비디빗</span>님 안녕하세요!
        </Title>
      </Wrap>
    </Link>
  );
}
