import React, { useState, useEffect } from 'react';
import { Application, DatePicker } from 'react-rainbow-components';
import color from 'styles/colors';
import './datepicker.scss';

export default function DateRangePicker() {
  const [range, setRange] = useState<Date | undefined>(undefined);

  const theme = {
    rainbow: {
      palette: {
        brand: color.primary,
        dark: color.grayscale.gray03
      }
    }
  };

  useEffect(() => {
    console.log(range);
    console.log(typeof range);
  }, [range]);

  return (
    <>
      <Application theme={theme}>
        <DatePicker
          id="rainbowDatePicker"
          placeholder="여행일정 선택"
          selectionType="range"
          formatStyle="small"
          variant="single"
          value={range}
          onChange={(value) => setRange(value)}
          locale="ko"
        />
      </Application>
    </>
  );
}
