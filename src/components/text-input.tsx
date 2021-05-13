import React from 'react';
import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';

const inputText = css`
  width: ${pxToVw(296)};
  height: ${pxToVw(48)};
  border: none;
  border-bottom: 1px solid ${color.border.gray01};
  padding: ${pxToVw(14)} 0;
  box-sizing: border-box;
  font-size: ${pxToVw(28)};

  &:focus {
    outline: none;
    border-bottom: 2px solid ${color.purple};
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
