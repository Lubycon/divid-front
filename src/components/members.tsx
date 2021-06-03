import React from 'react';
import Profile from 'components/profile';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button, { ButtonType } from 'components/button';
import { CaptionBold } from 'styles/typography';
import { MemberInfo } from 'model/members';

const MembersWrap = styled.div`
  display: flex;
  margin-top: 16px;
`;

const overlapIcon = css`
  margin-left: -14px;
`;

const PlusIcon = styled.span`
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url('/images/ico_plus_sm.svg') no-repeat center;
  background-size: contain;
`;

const Label = styled(CaptionBold)`
  display: inline-block;
  margin: 0 4px;
`;

interface MembersProps {
  members: MemberInfo[];
  inviteCode?: number | undefined;
}

export default function Members({ members, inviteCode = undefined }: MembersProps) {
  const me = members.filter((member) => member.me)[0];
  const others = members.filter((member) => !member.me);

  return (
    <MembersWrap>
      {/* 사용자 본인의 이모지 */}
      <Profile type={me.profile} isMe />
      {others?.map((member) => (
        <div key={member.userId} css={overlapIcon}>
          <Profile type={member.profile} />
        </div>
      ))}
      {inviteCode && (
        <div css={overlapIcon}>
          <Button buttonType={ButtonType.Round} onClick={() => console.log(inviteCode)}>
            <>
              <PlusIcon />
              <Label>친구초대</Label>
            </>
          </Button>
        </div>
      )}
    </MembersWrap>
  );
}
