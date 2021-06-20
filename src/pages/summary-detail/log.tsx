import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import Profile, { IconSize } from 'components/profile';
import { Heading5 as Amount, CaptionBold, Badge, Caption } from 'styles/typography';
import { numberWithCommas } from 'utils';
import { Animals } from 'api/types';
import { CalculateDetail } from 'model/expense';
import { flexAlignCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';

const DetailWrap = styled.div`
  ${flexAlignCenter};
  margin: ${pxToVw(8)} 0;
  justify-content: flex-end;

  ${mediaQuery(640)} {
    margin: 8px 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Text = styled(Caption)`
  color: ${color.grayscale.gray01};
  margin-left: ${pxToVw(4)};

  span {
    font-weight: 600;
  }

  ${mediaQuery(640)} {
    margin-left: 4px;
  }
`;

const Point = styled.span<{ kind: string }>`
  color: ${({ kind }) => (kind === 'give' ? color.red : color.green)};
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${pxToVw(16)};
  margin-bottom: ${pxToVw(8)};
  height: ${pxToVw(88)};
  background-color: ${color.grayscale.gray07};
  border-radius: 8px;
  box-sizing: border-box;

  ${mediaQuery(640)} {
    height: 88px;
    padding: 0 16px;
    margin-bottom: 8px;
  }
`;

const flexBox = css`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.grayscale.gray05};
  margin: ${pxToVw(16)} 0;

  ${mediaQuery(640)} {
    margin: 16px 0;
  }
`;

const Nothing = styled(Caption)`
  text-align: right;
  margin-top: ${pxToVw(16)};
  color: ${color.grayscale.gray03};

  ${mediaQuery(640)} {
    margin-top: 16px;
  }
`;

interface LogProps {
  expender: string;
  profile: Animals;
  amount: number;
  desc: string;
  isMe: boolean;
  calculateListDetails: CalculateDetail[];
}

export default function Log({ expender, profile, amount, desc, isMe, calculateListDetails }: LogProps) {
  return (
    <>
      <Wrap>
        <div css={flexBox}>
          <Profile iconSize={IconSize.SM} type={profile} isMe={isMe} nickName={expender} hasName />
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
      {calculateListDetails.length ? (
        calculateListDetails.map((el, i) => (
          <DetailWrap key={i}>
            <Profile type={el.profileImg} iconSize={IconSize.SM} />
            <Text>
              <span>{el.nickName}</span> 님에게 <Point kind={el.type}>{numberWithCommas(el.price)}원</Point>{' '}
              {el.type === 'GIVE' ? '주기' : '받기'}
            </Text>
          </DetailWrap>
        ))
      ) : (
        <Nothing>줄 내역이 없습니다.</Nothing>
      )}
      <Divider />
    </>
  );
}
