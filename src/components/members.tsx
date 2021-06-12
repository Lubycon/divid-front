import React from 'react';
import Profile from 'components/profile';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
  inviteCode?: number;
}

export default function Members({ members, inviteCode }: MembersProps) {
  const me = members.filter((member) => member.me)[0];
  const others = members.filter((member) => !member.me);
  const currentUrl = window.location.href;
  const copyLinkText = `여행링크: ${currentUrl} \r비밀번호: ${inviteCode}`;

  return (
    <MembersWrap>
      {/* 사용자 본인의 이모지 */}
      <Profile type={me.profileImg} isMe />
      {others?.map((member) => (
        <div key={member.userId} css={overlapIcon}>
          <Profile type={member.profileImg} />
        </div>
      ))}
      {inviteCode && (
        <div css={overlapIcon}>
          <CopyToClipboard text={copyLinkText}>
            <Button buttonType={ButtonType.Round} onClick={() => console.log(inviteCode)}>
              <>
                <PlusIcon />
                <Label>친구초대</Label>
              </>
            </Button>
          </CopyToClipboard>
        </div>
      )}
    </MembersWrap>
  );
}
