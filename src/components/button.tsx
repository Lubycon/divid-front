import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
import { flexCenter } from 'styles/containers';

const squareButton = css`
  width: 100%;
  height: ${pxToVw(58)};
  border-radius: 8px;
  font-weight: bold;
  outline: none;
  border: none;
  background: ${color.primary};
  color: ${color.white};
  ${flexCenter};
  cursor: pointer;

  p {
    color: ${color.white};
  }

  ${mediaQuery(640)} {
    height: 58px;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const roundButton = css`
  height: ${pxToVw(44)};
  border-radius: 100px;
  padding: 0 ${pxToVw(10)};
  background: ${color.white};
  box-sizing: border-box;
  border: 2px solid ${color.grayscale.gray06};
  ${flexCenter};
  cursor: pointer;

  ${mediaQuery(640)} {
    height: 44px;
    padding: 0 10px;
  }
`;

const textButton = css`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0;
  ${flexCenter};
  cursor: pointer;
`;

export enum ButtonType {
  Square = 'square',
  Round = 'round',
  Text = 'text'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customStyle?: SerializedStyles;
  buttonType?: ButtonType;
  children?: JSX.Element | JSX.Element[] | string;
}

export default function Button({ children, customStyle, buttonType = ButtonType.Square, ...rest }: ButtonProps) {
  const buttonStyle = () => {
    switch (buttonType) {
      case ButtonType.Square:
        return squareButton;
      case ButtonType.Round:
        return roundButton;
      case ButtonType.Text:
        return textButton;
      default:
        return squareButton;
    }
  };
  return (
    <button type="button" css={[buttonStyle, customStyle]} {...rest}>
      {children}
    </button>
  );
}
