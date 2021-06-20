import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import Profile, { IconSize } from 'components/profile';
import { Heading5 as Amount, CaptionBold, Badge } from 'styles/typography';
import { numberWithCommas } from 'utils';
import { Animals } from 'api/types';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  width: 100%;
  height: 88px;
  background-color: ${color.white};
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-radius: 8px;
  box-sizing: border-box;
`;

const flexBox = css`
  display: flex;
  align-items: center;
`;

interface LogProps {
  expender: string;
  profile: Animals;
  amount: number;
  desc: string;
  isMe: boolean;
  expenseId: number;
  tripId: string;
}

export default function Log({ expenseId, tripId, expender, profile, amount, desc, isMe }: LogProps) {
  return (
    <Link to={`/editExpense?tripId=${tripId}&expenseId=${expenseId}`}>
      <Wrap>
        <div css={flexBox}>
          <Profile iconSize={IconSize.SM} type={profile} isMe={isMe} hasName nickName={expender} />
        </div>
        <div
          css={css`
            text-align: right;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          `}
        >
          <div css={flexBox}>
            <Amount>{numberWithCommas(amount)}</Amount>
            <CaptionBold>원</CaptionBold>
          </div>
          <Badge
            css={css`
              color: ${color.grayscale.gray03};
            `}
          >
            {desc}
          </Badge>
        </div>
      </Wrap>
    </Link>
  );
}
