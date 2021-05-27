import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
import { Badge as CommonBadge } from 'styles/typography';

const inputText = css`
  width: 286px;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${color.grayscale.gray05};
  padding: ${pxToVw(14)} 0;
  box-sizing: border-box;
  font-size: ${pxToVw(26)};
  font-weight: 500;
  line-height: 1.5;
  background: transparent;

  ${mediaQuery(640)} {
    width: 544px;
    height: 48px;
    padding: 14px 0;
    font-size: 26px;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${color.primary};
  }

  &::placeholder {
    color: ${color.grayscale.gray01};
    font-size: ${pxToVw(26)};
    font-weight: 500;
    line-height: 1.5;
    opacity: 0.3;

    ${mediaQuery(640)} {
      font-size: 26px;
    }
  }
`;

const Badge = styled(CommonBadge)`
  color: ${color.font.gray05};
  margin-top: 4px;
  align-self: flex-start;
  line-height: 1.3;

  ${mediaQuery(640)} {
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
      {note ? <Badge>{note}</Badge> : null}
    </>
  );
}
