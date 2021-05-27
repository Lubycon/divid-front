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

export interface MemberInfo {
  userId: number;
  nickName: string;
  profile: Animals;
  me: boolean;
}

interface MembersProps {
  members: MemberInfo[];
  isInvitable?: boolean;
}

export default function Members({ members, isInvitable = false }: MembersProps) {
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
      {isInvitable && (
        <div css={overlapIcon}>
          <Button buttonType={ButtonType.Round}>친구초대</Button>
        </div>
      )}
    </MembersWrap>
  );
}
