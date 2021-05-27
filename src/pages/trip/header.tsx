import React from 'react';
import { css } from '@emotion/react';
import color from 'styles/colors';
import { Heading3 as Title, Body3 as Desc } from 'styles/typography';
import { changeStringToDate, makeDateFormat } from 'utils';
// import Members from 'components/members';

interface HeaderProps {
  name: string;
  startDate: string;
  endDate: string;
}

export default function Header({ name, startDate, endDate }: HeaderProps) {
  const sDate = changeStringToDate(startDate);
  const eDate = changeStringToDate(endDate);

  return (
    <>
      <Title>{name}</Title>
      <Desc
        css={css`
          color: ${color.grayscale.gray02};
          margin-top: 8px;
        `}
      >
        {`${makeDateFormat(sDate)} - ${makeDateFormat(eDate)}`}
      </Desc>
      {/* <Members /> */}
    </>
  );
}
