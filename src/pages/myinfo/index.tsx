import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import _ from 'lodash';
import { basicWrap, flexAlignCenter } from 'styles/containers';
import Profile, { Animals, IconSize } from 'components/profile';
import color from 'styles/colors';
import InputBox from 'components/input-box';
import { Caption as CommonCaption } from 'styles/typography';
import Button, { ButtonType } from 'components/button';

const OPTIONS = Object.values(Animals);

const IconSelector = styled.div`
  padding: 23px 0 19px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icons = styled.div`
  width: 188px;
  height: 96px;
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProfileWrap = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? color.primary : null)};
  margin-bottom: 8px;
`;

const ButtonWrap = styled.div`
  margin-top: 32px;
`;

const Caption = styled(CommonCaption)`
  color: ${color.grayscale.gray03};
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background-color: ${color.grayscale.gray05};
  margin: 0 16px;
`;

export default function Myinfo() {
  const [selected, setSelected] = useState(Animals.Hamster);
  const [nickname, setNickname] = useState('주예');

  const handleChange = _.debounce((value: string) => {
    setNickname(value);
    console.log(nickname);
  }, 500);

  return (
    <div css={basicWrap}>
      <IconSelector>
        <Profile type={selected} iconSize={IconSize.XL} />
        <Icons>
          {OPTIONS.map((option) => (
            <ProfileWrap key={option} selected={selected === option} onClick={() => setSelected(option)}>
              <Profile type={option} />
            </ProfileWrap>
          ))}
        </Icons>
      </IconSelector>
      <InputBox
        label="이름"
        note="최소 2자 최대 8자 입력가능해요."
        defaultValue={nickname}
        onChangeInput={handleChange}
      />
      <ButtonWrap>
        <Button>저장</Button>
      </ButtonWrap>
      <div
        css={[
          flexAlignCenter,
          css`
            margin-top: 57px;
          `
        ]}
      >
        <Button buttonType={ButtonType.Text}>
          <Caption>회원탈퇴</Caption>
        </Button>
        <Divider />
        <Button buttonType={ButtonType.Text}>
          <Caption>로그아웃</Caption>
        </Button>
      </div>
    </div>
  );
}
