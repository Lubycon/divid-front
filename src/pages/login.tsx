import React from 'react';
import { css } from '@emotion/react';

const sample = css`
  color: hotpink;
  font-size: 20px;
`;

export default function Login() {
  return <div css={sample}>login</div>;
}
