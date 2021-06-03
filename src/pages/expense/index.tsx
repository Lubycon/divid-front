import React from 'react';
import { basicWrap } from 'styles/containers';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useModal from 'hooks/useModal';
import { Animals } from 'api/types';
import { MemberInfo } from 'model/members';

import SelectModal from 'components/modal/select-modal';
import color from 'styles/colors';
import Button, { ButtonType } from 'components/button';
import TextInput from 'components/text-input';
import { CaptionBold } from 'styles/typography';
import Profile from 'components/profile';
import UserCheckbox from './user-checkbox';

const FormWrap = styled.div`
  width: 100%;
  min-height: 300px;
  padding: 16px 16px 20px;
  background: ${color.white};
  border: 1px solid ${color.grayscale.gray05};
  border-radius: 16px;
  box-sizing: border-box;
`;

const Caption = styled(CaptionBold)`
  color: ${color.grayscale.gray03};
  margin-bottom: 12px;
`;

const PayerButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  padding: 0;
  margin-bottom: 21px;
`;

const SelectWrap = styled.div`
  margin: 3px 5px;
`;

const MEMBERS: MemberInfo[] = [
  { userId: 1, nickName: '지형', profile: Animals.Rabbit, me: true },
  { userId: 2, nickName: '유진', profile: Animals.Bear, me: false },
  { userId: 3, nickName: '주예', profile: Animals.Unicorn, me: false },
  { userId: 4, nickName: '영진', profile: Animals.Panda, me: false }
];

export default function Expense() {
  const { handleOpen: openPayerModal, renderModal: renderPayerModal } = useModal({
    children: <SelectModal members={MEMBERS} />
  });

  return (
    <>
      {renderPayerModal()}
      <div
        css={[
          basicWrap,
          css`
            background-color: ${color.grayscale.gray07};
          `
        ]}
      >
        <FormWrap>
          <Button buttonType={ButtonType.Round}>04.16</Button>
          <div
            css={css`
              margin: 0 5px;
            `}
          >
            <TextInput placeholder="금액입력(원)" type="number" />
            <TextInput placeholder="내용입력" type="text" />
          </div>
          <SelectWrap>
            <Caption>낸 사람</Caption>
            <PayerButton onClick={openPayerModal}>
              <Profile nickName="지형" type={Animals.Rabbit} isMe hasName />
            </PayerButton>
            <Caption>쓴 사람</Caption>
            {Array.isArray(MEMBERS) &&
              MEMBERS.map(({ nickName, profile, me }) => <UserCheckbox nickName={nickName} type={profile} isMe={me} />)}
          </SelectWrap>
        </FormWrap>
        <Button
          css={css`
            margin-top: 16px;
          `}
        >
          저장
        </Button>
      </div>
    </>
  );
}
