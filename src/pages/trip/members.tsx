import React from 'react';
import Profile, { Animals } from 'components/profile';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button, { ButtonType } from 'components/button';

const MembersWrap = styled.div`
  display: flex;
  margin-top: 16px;
`;

const overlapIcon = css`
  margin-left: -14px;
`;

export default function Members() {
  return (
    <MembersWrap>
      {/* 사용자 본인의 이모지 */}
      <Profile type={Animals.Hamster} isMe />
      {/* 친구들의 이모지 (차후 map으로 수정) */}
      <div css={overlapIcon}>
        <Profile type={Animals.Puppy} />
      </div>
      <div css={overlapIcon}>
        <Button buttonType={ButtonType.Round}>친구초대</Button>
      </div>
    </MembersWrap>
  );
}
