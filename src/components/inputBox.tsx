import React from 'react';
import { css } from '@emotion/react';
import { mediaQuery, calcSize } from 'styles/media';
import color from 'styles/colors';

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | undefined;
  subinfo: string | undefined;
}

const container = css`
  display: flex;
  flex-direction: column;
`;

const inputText = css`
  width: ${calcSize(296)};
  height: ${calcSize(48)};
  border-radius: ${calcSize(8)};
  border: 1px solid ${color.border.gray01};
  padding: ${calcSize(14)} ${calcSize(16)};
  box-sizing: border-box;

  ${mediaQuery(640)} {
    width: 560px;
    height: 48px;
    border-radius: 8px;
    padding: 14px 16px;
  }
`;

const labelStyle = css`
  font-size: ${calcSize(16)};
  line-height: 1.5;
  color: ${color.font.gray10};
  margin-bottom: ${calcSize(8)};
  font-weight: 600;

  ${mediaQuery(640)} {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

const subtext = css`
  font-size: ${calcSize(14)};
  color: ${color.font.gray10};
  margin-top: 1.6vw;

  ${mediaQuery(640)} {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

export default function InputBox(props: InputBoxProps) {
  const { label, subinfo, ...rest } = props;

  return (
    <div css={container}>
      {label && <p css={labelStyle}>{label}</p>}
      <input css={inputText} type="text" {...rest} />
      {subinfo && <p css={subtext}>{subinfo}</p>}
    </div>
  );
}
