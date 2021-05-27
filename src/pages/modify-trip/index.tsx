import React from 'react';
import { basicWrap } from 'styles/containers';
import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import TextInput from 'components/text-input';
import Button from 'components/button';
import DateSelector from 'components/date-selector';

const button = css`
  margin-top: ${pxToVw(40)};

  ${mediaQuery(640)} {
    margin-top: 40px;
  }
`;

export default function Modify() {
  const defaultDate = new Date();

  return (
    <div css={basicWrap}>
      <TextInput placeholder="여행 이름 입력" note="이름은 최소 0자, 최대 00자까지 입력 가능해요" />
      <DateSelector defaultDate={defaultDate} />
      <Button customStyle={button}>다음</Button>
    </div>
  );
}
