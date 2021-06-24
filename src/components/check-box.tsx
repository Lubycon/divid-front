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
    background: url('/images/check_off.svg') center no-repeat;
    background-size: contain;
    cursor: pointer;
  }

  input[type='checkbox']:checked + label {
    background: url('/images/check_on.svg') center no-repeat;
    background-size: contain;
  }
`;

interface CheckBoxProps {
  userId: number;
  checked: boolean;
  handleClick: () => void;
}

export default function CheckBox({ userId, checked, handleClick }: CheckBoxProps) {
  return (
    <Wrap>
      <input id={`${userId}`} type="checkbox" checked={checked} onChange={handleClick} />
      <label htmlFor={`${userId}`} />
    </Wrap>
  );
}
