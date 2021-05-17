import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import color from 'styles/colors';

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
}

export default function Profile({ iconColor = IconColors.White, type, isMe = false }: ProfileProps) {
  return (
    <Wrap iconColor={iconColor} isMe={isMe}>
      <AnimalImg type={type} />
    </Wrap>
  );
}
