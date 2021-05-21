import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('/images/check_off.png') center no-repeat;
    background-size: contain;
    cursor: pointer;
  }

  input[type='checkbox']:checked + label {
    background: url('/images/check_on.png') center no-repeat;
    background-size: contain;
  }
`;

export default function CheckBox() {
  return (
    <Wrap>
      <label>
        <input type="checkbox" />
      </label>
    </Wrap>
  );
}
