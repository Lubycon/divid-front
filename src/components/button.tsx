import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
import { CaptionBold, Caption } from 'styles/typography';

export const squareButton = css`
  width: 100%;
  height: ${pxToVw(58)};
  border-radius: ${pxToVw(8)};
  font-size: ${pxToVw(16)};
  font-weight: bold;
  outline: none;
  border: none;
  background: ${color.primary};
  color: ${color.white};

  ${mediaQuery(640)} {
    height: 58px;
    border-radius: 8px;
    font-size: 16px;
  }

  &:disabled {
    opacity: 0.3;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const roundButton = css`
  height: 44px;
  border-radius: 100px;
  background: ${color.white};
  border: 2px solid ${color.grayscale.gray06};
  padding: 0 14px;
`;

const textButtonStyle = css`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0;
`;

export enum ButtonType {
  Square = 'square',
  Round = 'round'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customStyle?: SerializedStyles;
  buttonType?: ButtonType;
  children?: JSX.Element | string;
}

export default function Button({ children, customStyle, buttonType = ButtonType.Square, ...rest }: ButtonProps) {
  const buttonStyle = buttonType === ButtonType.Round ? roundButton : squareButton;

  return (
    <button type="button" css={[buttonStyle, customStyle]} {...rest}>
      <CaptionBold>{children}</CaptionBold>
    </button>
  );
}

export function TextButton({ children, ...rest }: ButtonProps) {
  return (
    <button type="button" css={[textButtonStyle]} {...rest}>
      <Caption>{children}</Caption>
    </button>
  );
}
