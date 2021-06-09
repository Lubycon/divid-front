import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { basicWrap, flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import TextInput from 'components/text-input';
import Button from 'components/button';
import DateRangePicker from 'components/datepicker';
import { Heading7 as Label } from 'styles/typography';
import { usePostTrip } from 'hooks/data/useTripInfo';
import { atom } from 'recoil';

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

export const newProjectState = atom({
  key: 'newProjectState',
  default: {
    enterCode: '',
    tripName: '',
    startDate: '',
    endDate: ''
  }
});

export default function Create() {
  // 임시하드코딩
  const { refetch } = usePostTrip({
    enterCode: '31',
    tripName: '제주도 한달살기!',
    startDate: '2021-06-27',
    endDate: '2021-07-30'
  });
  const handleSubmit = async () => {
    await refetch();
  };
  return (
    <div css={basicWrap}>
      <TextInput placeholder="여행 이름 입력" note="이름은 최소 0자, 최대 00자까지 입력 가능해요" />
      <PickerWrapper>
        <DateRangePicker />
        <Arrow />
      </PickerWrapper>
      <Button onClick={handleSubmit} customStyle={button}>
        <Label>다음</Label>
      </Button>
    </div>
  );
}
