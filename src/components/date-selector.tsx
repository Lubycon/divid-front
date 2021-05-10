import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { css } from '@emotion/react';
import { mediaQuery, pxToVw } from 'styles/media';
import ko from 'date-fns/locale/ko';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';

const datePickerWrap = css`
  display: flex;
  align-self: flex-start;
  margin-top: ${pxToVw(16)};

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

const divider = css`
  padding: 0 10px;
  font-size: 28px;
`;

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

interface DateSelectorProps {
  defaultDate: Date;
}

export default function DateSelector({ defaultDate }: DateSelectorProps) {
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);

  useEffect(() => {
    registerLocale('ko', ko);
  }, []);

  return (
    <div css={datePickerWrap}>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        locale="ko"
        customInput={<CustomInput />}
        dateFormat="M.deee"
      />
      <span css={divider}> - </span>
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        locale="ko"
        customInput={<CustomInput />}
        dateFormat="M.deee"
      />
    </div>
  );
}
