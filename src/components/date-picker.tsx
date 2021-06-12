import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ko from 'date-fns/locale/ko';
import { changeDateToString, makeDateFormat } from 'utils';

import { mediaQuery, pxToVw } from 'styles/media';
import { Body1, Heading7 } from 'styles/typography';
import { flexCenter, flexAlignCenter } from 'styles/containers';
import { Close } from 'styles/icon';
import color from 'styles/colors';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';
import Button from './button';

const ShowPickerButton = styled(Body1)`
  cursor: pointer;
`;
const Wrap = styled.div`
  ${flexAlignCenter};
  margin-top: ${pxToVw(16)};
  position: relative;

  ${mediaQuery(640)} {
    margin-top: 16px;
  }
`;

const customInput = css`
  outline: none;
  border: none;
  padding: 0;
  background: white;
  font-size: 28px;
`;

const DatePickerWrap = styled.div<{ isEndDate: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  min-height: 100vh;
  background-color: ${color.grayscale.gray07};

  ${mediaQuery(640)} {
    position: absolute;
    top: 50px;
    width: 375px;
    min-height: auto;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
    border-radius: 16px;
    height: ${({ isEndDate }) => (isEndDate ? 615 : 530)}px;
  }
`;

const ButtonWrap = styled.div`
  width: 87.2vw;
  margin: 0 auto;

  ${mediaQuery(640)} {
    position: absolute;
    width: 327px;
    min-height: auto;
    bottom: 32px;
    left: 24px;
  }
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

const Header = styled.div`
  position: absolute;
  top: 20px;
  z-index: 11;
  left: calc(50vw - 45px);

  ${mediaQuery(640)} {
    top: 20px;
    left: 142.5px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 44px;
  height: 44px;
  ${flexCenter};
  z-index: 11;

  ${mediaQuery(640)} {
    top: 10px;
  }
`;

registerLocale('ko', ko);
setDefaultLocale('ko');

const CustomInput = ({
  value,
  onClick
}: {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => (
  <button type="button" css={customInput} onClick={onClick}>
    {value}
  </button>
);

interface DatePickerProps {
  setDate: (startDate: string, endDate: string) => void;
}

export default function DateRangeSelector({ setDate }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (end !== null) {
      const startDateString = changeDateToString(start);
      const endDateString = changeDateToString(end);

      setDate(startDateString, endDateString);
    }
    console.log(startDate, endDate);
  };

  return (
    <Wrap>
      <ShowPickerButton onClick={() => setShowPicker(!showPicker)} onKeyDown={() => setShowPicker(!showPicker)}>
        {endDate ? `${makeDateFormat(startDate)} - ${makeDateFormat(endDate)}` : '여행일정 선택'}
      </ShowPickerButton>
      {showPicker && (
        <DatePickerWrap isEndDate={!!endDate}>
          <Header>
            <Heading7>여행일정 선택</Heading7>
          </Header>
          <CloseButton onClick={() => setShowPicker(false)}>
            <Close />
          </CloseButton>
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={<CustomInput />}
            dateFormat="M.deee"
            selectsRange
            todayButton="오늘"
            inline
          />
          {!!endDate && (
            <ButtonWrap>
              <Button onClick={() => setShowPicker(false)}>
                <Label>일정 선택 완료</Label>
              </Button>
            </ButtonWrap>
          )}
        </DatePickerWrap>
      )}
    </Wrap>
  );
}
