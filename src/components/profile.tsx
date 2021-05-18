import React from 'react';
import styled from '@emotion/styled';
import { flexAlignCenter, flexCenter } from 'styles/containers';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { Heading7 as Tag, Badge as BadgeCommon } from 'styles/typography';

const Wrap = styled.div<{ iconColor: IconColors; isMe: boolean }>`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-sizing: border-box;

  ${({ iconColor }) =>
    iconColor === 'white'
      ? css`
          background-color: ${color.white};
          border: 2px solid ${color.grayscale.gray06};
        `
      : css`
          background-color: ${color.grayscale.gray07};
          border: 1px solid ${color.grayscale.gray06};
        `}

  ${({ isMe }) =>
    isMe &&
    css`
      border-color: ${color.primary};
    `}
`;

const AnimalImg = styled.div<{ type: string }>`
  width: 24px;
  height: 24px;
  background: url('${window.location.origin}/images/ico_${({ type }) => type}.png') center no-repeat;
  background-size: contain;
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

export enum IconColors {
  White = 'white',
  Gray = 'gray'
}

interface ProfileProps {
  iconColor?: IconColors;
  type: Animals;
  isMe?: boolean;
  hasName?: boolean;
}

export default function Profile({ iconColor = IconColors.White, type, isMe = false, hasName = false }: ProfileProps) {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Wrap iconColor={iconColor} isMe={isMe}>
        <AnimalImg type={type} />
      </Wrap>
      {hasName ? (
        <NameWrap>
          <Tag>지형</Tag>
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
