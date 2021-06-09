import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { basicWrap, flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import TextInput from 'components/text-input';
import Button from 'components/button';
// import DateRangePicker from 'components/datepicker';
import DateRangeSelector from 'components/date-picker';
import { Heading7 as Label } from 'styles/typography';
import { usePostTrip } from 'hooks/data/useTripInfo';
import { atom, useRecoilState } from 'recoil';

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
  const [newProject, setNewProject] = useRecoilState(newProjectState);

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const newTripName = e.target.value;
    setNewProject({ ...newProject, tripName: newTripName });
  };

  const handleChooseDate = (startDate: string, endDate: string) => {
    setNewProject({ ...newProject, startDate, endDate });
  };

  // 임시하드코딩
  const { refetch } = usePostTrip({
    ...newProject,
    enterCode: String(Math.floor(Math.random() * 90 + 10))
  });

  const handleSubmit = async () => {
    await refetch();
  };
  return (
    <div css={basicWrap}>
      <TextInput
        onBlur={handleChange}
        placeholder="여행 이름 입력"
        note="이름은 최소 0자, 최대 00자까지 입력 가능해요"
      />
      <PickerWrapper>
        {/* <DateRangePicker /> */}
        <DateRangeSelector setDate={handleChooseDate} />
        <Arrow />
      </PickerWrapper>
      <Button onClick={handleSubmit} customStyle={button}>
        <Label>다음</Label>
      </Button>
    </div>
  );
}
