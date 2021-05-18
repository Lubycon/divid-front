import React from 'react';
import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';

const inputText = css`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${color.grayscale.gray05};
  padding: ${pxToVw(14)} 0;
  box-sizing: border-box;
  margin: 9px 0;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${color.primary};
  }

  &::placeholder {
    color: ${color.grayscale.gray01};
    opacity: 0.3;
  }

  ${mediaQuery(640)} {
    width: 560px;
    height: 48px;
    padding: 14px 0;
    font-size: 28px;
  }
`;

const subtext = css`
  font-size: ${pxToVw(12)};
  color: ${color.font.gray05};
  margin-top: 1.6vw;
  align-self: flex-start;

  ${mediaQuery(640)} {
    font-size: 12px;
    margin-bottom: 6px;
  }
`;

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
}

export default function TextInput({ label, note, ...rest }: InputBoxProps) {
  return (
    <>
      <input css={inputText} type="text" {...rest} />
      {note ? <p css={subtext}>{note}</p> : null}
    </>
  );
}
