import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';

export const squareButton = css`
  width: ${pxToVw(295)};
  height: ${pxToVw(58)};
  border-radius: ${pxToVw(8)};
  font-size: ${pxToVw(16)};
  font-weight: bold;
  outline: none;
  border: none;
  background: ${color.primary};
  color: ${color.white};

  ${mediaQuery(640)} {
    width: 560px;
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  customStyle: SerializedStyles;
}

export default function Button({ label = '확인', customStyle, ...rest }: ButtonProps) {
  return (
    <button type="button" css={[squareButton, customStyle]} {...rest}>
      {label}
    </button>
  );
}
