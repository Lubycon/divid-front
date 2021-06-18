import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { basicWrap, flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import TextInput from 'components/text-input';
import Button from 'components/button';
import DateRangeSelector from 'components/date-picker';
import { Heading7 } from 'styles/typography';
import { useGetDetailTripInfo, useEditTripInfo } from 'hooks/data/useTripInfo';
import { atom, useRecoilState } from 'recoil';
import color from 'styles/colors';
import { changeStringToDate, useQueryString } from 'utils';

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

export const editProjectState = atom({
  key: 'editProjectState',
  default: {
    tripName: '',
    startDate: '',
    endDate: ''
  }
});

export default function Modify() {
  const [editProject, setEditProject] = useRecoilState(editProjectState);
  const tripId = useQueryString().get('tripId');
  const { data: info } = useGetDetailTripInfo(tripId || '');
  const { refetch } = useEditTripInfo(tripId || '', editProject);

  useEffect(() => {
    if (info) {
      setEditProject({ ...info });
    }
  }, [info]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const editTripName = e.target.value;
    setEditProject({ ...editProject, tripName: editTripName });
  };

  const handleChooseDate = (startDate: string, endDate: string) => {
    setEditProject({ ...editProject, startDate, endDate });
  };

  const handleSubmit = async () => {
    const { data, isError } = await refetch();

    if (!isError && data) {
      window.history.back();
    }
  };

  return (
    <div css={basicWrap}>
      <TextInput
        onChange={handleChange}
        placeholder="여행 이름 입력"
        note="이름은 최소 2자, 최대 14자까지 입력 가능해요"
        maxLength={14}
        minLength={2}
        defaultValue={editProject.tripName}
      />
      <PickerWrapper>
        {!!editProject.startDate.length && !!editProject.endDate.length && (
          <DateRangeSelector
            setDate={handleChooseDate}
            defaultStartDate={changeStringToDate(editProject.startDate)}
            defaultEndDate={changeStringToDate(editProject.endDate)}
          />
        )}
        <Arrow />
      </PickerWrapper>
      <Button
        onClick={handleSubmit}
        customStyle={button}
        disabled={!editProject.tripName.length || !editProject.endDate.length}
      >
        <Label>저장</Label>
      </Button>
    </div>
  );
}
