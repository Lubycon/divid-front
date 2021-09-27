import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
import { Badge as CommonBadge } from 'styles/typography';

const InputText = styled.input<{ error: boolean }>`
  width: ${pxToVw(286)};
  height: ${pxToVw(40)};
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

  border-color: ${({ error }) => error && color.red};

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

const ErrorBadge = styled(CommonBadge)`
  color: ${color.red};
  align-self: flex-start;
  line-height: 1.5;
  margin-left: ${pxToVw(4)};
  max-width: ${pxToVw(267)};

  ${mediaQuery(640)} {
    max-width: auto;
    margin-left: 4px;
  }
`;

const BadgeWrap = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 4px;

  ${mediaQuery(640)} {
    margin-bottom: 6px;
  }
`;

const ErrorIcon = styled.div`
  width: ${pxToVw(16)};
  height: ${pxToVw(16)};
  background: url('/images/error.svg') no-repeat center;
  background-size: contain;

  ${mediaQuery(640)} {
    width: 16px;
    height: 16px;
  }
`;

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
  error?: boolean;
  errorMsg?: string;
}

export default function TextInput({ label, note, error = false, errorMsg, ...rest }: InputBoxProps) {
  return (
    <>
      <InputText type="text" {...rest} error={error} />
      {note && !error ? <Badge>{note}</Badge> : null}
      {errorMsg && error ? (
        <BadgeWrap>
          <ErrorIcon />
          <ErrorBadge>{errorMsg}</ErrorBadge>
        </BadgeWrap>
      ) : null}
    </>
  );
}
