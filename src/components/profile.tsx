import React from 'react';
import styled from '@emotion/styled';
import { flexAlignCenter, flexCenter } from 'styles/containers';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { Heading7 as Tag, Badge as BadgeCommon } from 'styles/typography';
import { typeToEmoji } from 'utils';

const smallWrap = css`
  width: 40px;
  height: 40px;
  background-color: ${color.grayscale.gray07};
  border: 1px solid ${color.grayscale.gray06};
  font-size: 20px;
`;

const mediumWrap = css`
  width: 44px;
  height: 44px;
  background-color: ${color.white};
  border: 2px solid ${color.grayscale.gray06};
  font-size: 24px;
`;

const largeWrap = css`
  width: 80px;
  height: 80px;
  background-color: ${color.grayscale.gray07};
  border: 2px solid ${color.grayscale.gray05};
  font-size: 40px;
`;

const xLargeWrap = css`
  width: 100px;
  height: 100px;
  background-color: ${color.grayscale.gray07};
  border: 2px solid ${color.grayscale.gray05};
  font-size: 44px;
`;

const Wrap = styled.div<{ iconSize: IconSize; isMe: boolean }>`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-sizing: border-box;
  background-color: ${color.grayscale.gray07};
  border: 1px solid ${color.grayscale.gray06};

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

  ${({ isMe }) =>
    isMe &&
    css`
      border-color: ${color.primary};
    `}
`;

const NameWrap = styled.div`
  ${flexAlignCenter};
  margin-left: 4px;
`;

const CircleTag = styled.div`
  background: ${color.grayscale.gray01};
  border-radius: 100px;
  width: 20px;
  height: 20px;
  ${flexCenter}
  margin-left: 2px;
`;

const Badge = styled(BadgeCommon)`
  color: ${color.white};
  height: 7.5px;
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
}

export default function Profile({
  iconSize = IconSize.ME,
  nickName,
  type,
  isMe = false,
  hasName = false
}: ProfileProps) {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Wrap iconSize={iconSize} isMe={isMe}>
        {typeToEmoji(type)}
      </Wrap>
      {hasName ? (
        <NameWrap>
          <Tag>{nickName}</Tag>
          {isMe ? (
            <CircleTag>
              <Badge>나</Badge>
            </CircleTag>
          ) : null}
        </NameWrap>
      ) : null}
    </div>
  );
}
