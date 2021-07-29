import React, { useState } from 'react';
import Profile from 'components/profile';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button, { ButtonType } from 'components/button';
import { CaptionBold, Heading7 } from 'styles/typography';
import { MemberInfo } from 'model/members';
import { DetailTripInfo } from 'model/trip';
import color from 'styles/colors';
import SnackBar from 'components/snack-bar';

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

const Text = styled(Heading7)`
  span {
    color: ${color.green};
  }
`;

interface MembersProps {
  members: MemberInfo[];
  trip?: DetailTripInfo;
}

export default function Members({ members, trip }: MembersProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const me = members.filter((member) => member.me)[0];
  const others = members.filter((member) => !member.me);
  const currentUrl = window.location.href;

  const copyLinkText = `여행에 참여하고 디빗에서 정산에 대한 걱정 없이 여행을 즐겨보세요! 
  여행이름: ${trip?.tripName}
  여행기간: ${trip?.startDate} ~ ${trip?.endDate}
  참여코드: ${trip?.inviteCode}
  여행링크: ${currentUrl} 
  `;

  const handleInvite = () => {
    setOpenSnackbar(true);

    setTimeout(() => {
      setOpenSnackbar(false);
    }, 3000);
  };

  return (
    <>
      <MembersWrap>
        {/* 사용자 본인의 이모지 */}
        <Profile type={me.profileImg} isMe />
        {others?.map((member) => (
          <div key={member.userId} css={overlapIcon}>
            <Profile type={member.profileImg} />
          </div>
        ))}
        {trip && (
          <div css={overlapIcon}>
            <CopyToClipboard text={copyLinkText}>
              <Button buttonType={ButtonType.Round} onClick={handleInvite}>
                <>
                  <PlusIcon />
                  <Label>친구초대</Label>
                </>
              </Button>
            </CopyToClipboard>
          </div>
        )}
      </MembersWrap>
      {openSnackbar && (
        <SnackBar isOpen={openSnackbar}>
          <Text>
            초대 링크가 복사되었습니다. 참여코드 <span>{trip?.inviteCode}</span>
          </Text>
        </SnackBar>
      )}
    </>
  );
}
