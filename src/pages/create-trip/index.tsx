import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { basicWrap, flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import TextInput from 'components/text-input';
import Button from 'components/button';
import DateRangePicker from 'components/datepicker';
import { Heading7 as Label } from 'styles/typography';

const button = css`
  margin-top: ${pxToVw(40)};

  ${mediaQuery(640)} {
    margin-top: 40px;
  }
`;

const Arrow = styled.span`
  width: 24px;
  height: 24px;
  background: url('/images/arrow_down.svg') center no-repeat;
  background-size: contain;
`;

const PickerWrapper = styled.div`
  ${flexAlignCenter};
  margin-top: 16px;
`;

export default function Create() {
  return (
    <div css={basicWrap}>
      <TextInput placeholder="여행 이름 입력" note="이름은 최소 0자, 최대 00자까지 입력 가능해요" />
      <PickerWrapper>
        <DateRangePicker />
        <Arrow />
      </PickerWrapper>
      <Button customStyle={button}>
        <Label>다음</Label>
      </Button>
    </div>
  );
}
