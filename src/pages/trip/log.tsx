import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import Profile, { IconColors } from 'components/profile';
import { Heading7, Heading5 as Amount, CaptionBold, Badge } from 'styles/typography';
import { numberWithCommas } from 'utils';
import { Animals } from 'components/profile';

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

const Name = styled(Heading7)`
  margin-left: 12px;
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
}

export default function Log({ expender, profile, amount, desc }: LogProps) {
  return (
    <Wrap>
      <div css={flexBox}>
        <Profile iconColor={IconColors.Gray} type={profile} />
        <Name>{expender}</Name>
      </div>
      <div
        css={css`
          text-align: right;
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
  );
}
