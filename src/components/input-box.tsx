import React from 'react';
import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';

const container = css`
  display: flex;
  flex-direction: column;
`;

const inputText = css`
  width: ${pxToVw(296)};
  height: ${pxToVw(48)};
  border-radius: ${pxToVw(8)};
  border: 1px solid ${color.border.gray01};
  padding: ${pxToVw(14)} ${pxToVw(16)};
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  ${mediaQuery(640)} {
    width: 560px;
    height: 48px;
    border-radius: 8px;
    padding: 14px 16px;
  }
`;

const labelStyle = css`
  font-size: ${pxToVw(16)};
  line-height: 1.5;
  color: ${color.font.gray10};
  margin-bottom: ${pxToVw(8)};
  font-weight: 600;

  ${mediaQuery(640)} {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

const subtext = css`
  font-size: ${pxToVw(14)};
  color: ${color.font.gray10};
  margin-top: 1.6vw;

  ${mediaQuery(640)} {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
}

export default function InputBox({ label, note, ...rest }: InputBoxProps) {
  return (
    <div css={container}>
      {label && <p css={labelStyle}>{label}</p>}
      <input css={inputText} type="text" {...rest} />
      {note && <p css={subtext}>{note}</p>}
    </div>
  );
}
