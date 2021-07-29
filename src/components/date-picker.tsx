import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ko from 'date-fns/locale/ko';
import { changeDateToString, makeDateFormat2, makeDateFormat } from 'utils';

import { mediaQuery, pxToVw } from 'styles/media';
import { Body1, Heading7, Heading6 } from 'styles/typography';
import { flexCenter, flexAlignCenter } from 'styles/containers';
import { ArrowLeft as ArrowLeftCommon, ArrowRight as ArrowRightCommon, Close } from 'styles/icon';
import color from 'styles/colors';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';
import Button, { ButtonType } from './button';

const ShowPickerButton = styled(Body1)`
  cursor: pointer;
`;

const Wrap = styled.div`
  ${flexAlignCenter};
  margin-top: ${pxToVw(8)};
  position: relative;

  ${mediaQuery(640)} {
    margin-top: 8px;
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

const HeaderTitle = styled(Heading7)`
  font-size: 16px;
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
`;

const DownIcon = styled.span`
  width: 16px;
  height: 16px;
  background: url('/images/chevron-down.svg') no-repeat center;
  background-size: contain;
`;

const ArrowRight = styled(ArrowRightCommon)`
  position: absolute;
  z-index: 11;
  right: 17px;
  top: 124px;
  width: 24px;
  height: 24px;
  pointer-events: none;
`;

const ArrowLeft = styled(ArrowLeftCommon)`
  position: absolute;
  z-index: 11;
  right: 103px;
  top: 124px;
  width: 24px;
  height: 24px;
  pointer-events: none;
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
  defaultStartDate?: Date;
  defaultEndDate?: Date;
}

export default function DateRangeSelector({ setDate, defaultStartDate, defaultEndDate }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(defaultStartDate || new Date());
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate || null);

  const handleChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (end !== null) {
      const startDateString = changeDateToString(start);
      const endDateString = changeDateToString(end);

      setDate(startDateString, endDateString);
    }
  };

  return (
    <Wrap>
      <ShowPickerButton onClick={() => setShowPicker(!showPicker)} onKeyDown={() => setShowPicker(!showPicker)}>
        {endDate ? `${makeDateFormat(startDate)} - ${makeDateFormat(endDate)}` : '여행일정 선택'}
      </ShowPickerButton>
      {showPicker && (
        <DatePickerWrap isEndDate={!!endDate}>
          <Header>
            <HeaderTitle>여행일정 선택</HeaderTitle>
          </Header>
          <CloseButton onClick={() => setShowPicker(false)}>
            <Close />
          </CloseButton>
          <ArrowLeft />
          <ArrowRight />
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

interface SingleDatePickerProps {
  setDate: (date: string) => void;
  defaultDate?: Date;
}

export function SingleDatePicker({ setDate, defaultDate }: SingleDatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [singleDate, setSingleDate] = useState(defaultDate || new Date());

  const handleChange = (date: Date) => {
    setSingleDate(date);
    setDate(changeDateToString(date));
  };

  return (
    <Wrap>
      <Button
        buttonType={ButtonType.Round}
        onClick={() => setShowPicker(!showPicker)}
        onKeyDown={() => setShowPicker(!showPicker)}
      >
        <>
          <Heading6>{singleDate ? `${makeDateFormat2(singleDate)}` : ''}</Heading6>
        </>
        <DownIcon />
      </Button>
      {showPicker && (
        <DatePickerWrap isEndDate={!!singleDate}>
          <Header>
            <HeaderTitle>여행일정 선택</HeaderTitle>
          </Header>
          <CloseButton onClick={() => setShowPicker(false)}>
            <Close />
          </CloseButton>
          <ArrowLeft />
          <ArrowRight />
          <DatePicker
            selected={singleDate}
            onChange={handleChange}
            selectsStart
            customInput={<CustomInput />}
            dateFormat="MM.dd"
            todayButton="오늘"
            inline
          />
          {!!singleDate && (
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
