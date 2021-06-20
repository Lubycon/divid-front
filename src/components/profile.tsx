import React from 'react';
import styled from '@emotion/styled';
import { flexAlignCenter } from 'styles/containers';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import { Heading7 as Tag } from 'styles/typography';
import { typeToEmoji } from 'utils';

const smallWrap = css`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  font-size: ${pxToVw(20)};
  background-color: ${color.grayscale.gray07};
  border: 2px solid ${color.grayscale.gray06};

  ${mediaQuery(640)} {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const mediumWrap = css`
  width: ${pxToVw(44)};
  height: ${pxToVw(44)};
  font-size: ${pxToVw(24)};
  border: 2px solid ${color.grayscale.gray06};
  background-color: ${color.white};

  ${mediaQuery(640)} {
    height: 44px;
    width: 44px;
    font-size: 24px;
  }
`;

const largeWrap = css`
  width: ${pxToVw(56)};
  height: ${pxToVw(56)};
  font-size: ${pxToVw(28)};
  background-color: ${color.grayscale.gray07};
  border: 2px solid ${color.grayscale.gray05};

  ${mediaQuery(640)} {
    width: 56px;
    height: 56px;
    font-size: 28px;
  }
`;

const xLargeWrap = css`
  width: ${pxToVw(100)};
  height: ${pxToVw(100)};
  font-size: ${pxToVw(44)};
  border: 2px solid ${color.grayscale.gray05};
  background-color: ${color.grayscale.gray07};

  ${mediaQuery(640)} {
    height: 100px;
    width: 100px;
    font-size: 44px;
  }
`;

const Wrap = styled.div<{ iconSize: IconSize; isMe: boolean; borderColor: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-sizing: border-box;
  background-color: ${color.grayscale.gray07};
  border: 2px solid ${color.grayscale.gray06};

  ${({ iconSize }) => {
    switch (iconSize) {
      case IconSize.SM:
        return smallWrap;
      case IconSize.ME:
        return mediumWrap;
      case IconSize.LG:
        return largeWrap;
      case IconSize.XL:
        return xLargeWrap;
      default:
        return mediumWrap;
    }
  }}

  ${({ isMe, borderColor }) =>
    isMe &&
    borderColor &&
    css`
      border-color: ${color.primary};
    `}
`;

const NameWrap = styled.div`
  ${flexAlignCenter};
  margin-left: ${pxToVw(4)};

  ${mediaQuery(640)} {
    margin-left: 4px;
  }
`;

const Badge = styled.div`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  margin-left: ${pxToVw(2)};
  background: url('/images/ico_me.svg') no-repeat center;
  background-size: contain;

  ${mediaQuery(640)} {
    width: 20px;
    height: 20px;
    margin-left: 2px;
  }
`;

export enum Animals {
  Bear = 'bear',
  Puppy = 'puppy',
  Unicorn = 'unicorn',
  Hamster = 'hamster',
  Fox = 'fox',
  Panda = 'panda',
  Tiger = 'tiger',
  Rabbit = 'rabbit'
}

export enum IconSize {
  SM = 'small',
  ME = 'medium',
  LG = 'large',
  XL = 'extraLarge'
}

export interface ProfileProps {
  iconSize?: IconSize;
  nickName?: string;
  type: Animals;
  isMe?: boolean;
  hasName?: boolean;
  borderColor?: boolean;
}

export default function Profile({
  iconSize = IconSize.ME,
  nickName,
  type,
  isMe = false,
  hasName = false,
  borderColor = true
}: ProfileProps) {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Wrap iconSize={iconSize} isMe={isMe} borderColor={borderColor}>
        {typeToEmoji(type)}
      </Wrap>
      {hasName ? (
        <NameWrap>
          <Tag>{nickName}</Tag>
          {isMe ? <Badge /> : null}
        </NameWrap>
      ) : null}
    </div>
  );
}
