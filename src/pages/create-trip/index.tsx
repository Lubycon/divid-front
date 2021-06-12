import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { basicWrap, flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import TextInput from 'components/text-input';
import Button from 'components/button';
import DateRangeSelector from 'components/date-picker';
import { Heading7 } from 'styles/typography';
import { usePostTrip } from 'hooks/data/useTripInfo';
import { atom, useRecoilState } from 'recoil';
import color from 'styles/colors';

const button = css`
  margin-top: ${pxToVw(40)};

  ${mediaQuery(640)} {
    margin-top: 40px;
  }
`;

const Label = styled(Heading7)`
  color: ${color.white};
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
  const history = useHistory();
  const { refetch } = usePostTrip({
    ...newProject,
    enterCode: String(Math.floor(Math.random() * 90 + 10))
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTripName = e.target.value;
    setNewProject({ ...newProject, tripName: newTripName });
  };

  const handleChooseDate = (startDate: string, endDate: string) => {
    setNewProject({ ...newProject, startDate, endDate });
  };

  const handleSubmit = async () => {
    const { data, isError } = await refetch();

    if (!isError && data) {
      history.push('/projects');
    }
  };
  return (
    <div css={basicWrap}>
      <TextInput
        onChange={handleChange}
        placeholder="여행 이름 입력"
        note="이름은 최소 1자, 최대 10자까지 입력 가능해요"
        maxLength={10}
      />
      <PickerWrapper>
        <DateRangeSelector setDate={handleChooseDate} />
        <Arrow />
      </PickerWrapper>
      <Button
        onClick={handleSubmit}
        customStyle={button}
        disabled={!newProject.tripName.length || !newProject.endDate.length}
      >
        <Label>저장</Label>
      </Button>
    </div>
  );
}
