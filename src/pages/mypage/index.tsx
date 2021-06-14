import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useModal from 'hooks/useModal';
import ButtonModal from 'components/modal/button-modal';
import styled from '@emotion/styled';
import _ from 'lodash';
import { basicWrap, flexCenter } from 'styles/containers';
import { Heading7 } from 'styles/typography';
import Profile, { Animals, IconSize } from 'components/profile';
import color from 'styles/colors';
import InputBox from 'components/input-box';
import Button, { ButtonType } from 'components/button';
import Footer from 'components/footer';
import { CheckMark } from 'styles/icon';
import { SubButtonWrap as CommonButtonWrap, Caption, Divider } from 'components/footer';
import { useGetMyPage, useEditMyPage, usePostWithdrawal } from 'hooks/data/useMyPage';
import Loading from 'pages/loading';

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

const ProfileWrap = styled.div`
  margin-bottom: 8px;
  z-index: 2;
  position: relative;
`;

const MarkWrap = styled.div`
  background-color: rgba(88, 90, 241, 0.4);
  width: 100%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  ${flexCenter};
`;

const ButtonWrap = styled.div`
  margin-top: 32px;
`;

const SubButtonWrap = styled(CommonButtonWrap)`
  margin-top: 57px;
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

export default function MyPage() {
  const [selected, setSelected] = useState<Animals>(Animals.Hamster);
  const [nickname, setNickname] = useState('');
  const history = useHistory();

  const { data, isLoading } = useGetMyPage();
  const { refetch: modifyMyinfo } = useEditMyPage({
    nickName: nickname,
    profileImg: selected
  });
  const { refetch: postWithdrawal } = usePostWithdrawal();

  useEffect(() => {
    if (data) {
      setNickname(data.nickName);
      setSelected(data.profileImg);
    }
  }, [data]);

  const handleChange = _.debounce((value: string) => {
    setNickname(value);
    console.log(nickname);
  }, 500);

  const handleSubmit = async () => {
    await modifyMyinfo();
    history.push('/projects');
  };

  const LogoutModalContents = (
    <ButtonModal
      title="로그아웃"
      body="정말 로그아웃 하시겠어요?"
      buttons={{
        left: {
          label: '취소',
          handleClick: () => {
            console.log('취소 클릭');
          }
        },
        right: {
          label: '로그아웃',
          handleClick: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            history.push('/login');
          }
        }
      }}
    />
  );

  const WithdrawModalContents = (
    <ButtonModal
      type="withdraw"
      title="정말 탈퇴하시겠어요?"
      body="디빗을 탈퇴하면 나의 여행정산내역이 모두 사라져요. 그래도 탈퇴하시겠어요?"
      buttons={{
        left: {
          label: '탈퇴',
          handleClick: () => {
            postWithdrawal();
          }
        },
        right: {
          label: '취소',
          handleClick: () => {
            console.log('취소 클릭');
          }
        }
      }}
    />
  );

  const { handleOpen: openLogoutModal, renderModal: renderLogoutModal } = useModal({
    children: LogoutModalContents
  });

  const { handleOpen: openWithdrawModal, renderModal: renderWithdrawModal } = useModal({
    children: WithdrawModalContents
  });

  if (isLoading) {
    <Loading />;
  }

  return (
    <>
      {renderLogoutModal()}
      {renderWithdrawModal()}
      <div css={basicWrap}>
        <IconSelector>
          <Profile type={selected} iconSize={IconSize.XL} />
          <Icons>
            {Object.values(Animals).map((option) => (
              <ProfileWrap key={option} onClick={() => setSelected(option)}>
                {selected === option && (
                  <MarkWrap>
                    <CheckMark theme={color.white} />
                  </MarkWrap>
                )}
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
          <Button onClick={handleSubmit}>
            <Label>저장</Label>
          </Button>
        </ButtonWrap>
        <SubButtonWrap>
          <Button buttonType={ButtonType.Text} onClick={openWithdrawModal}>
            <Caption>회원탈퇴</Caption>
          </Button>
          <Divider />
          <Button buttonType={ButtonType.Text} onClick={openLogoutModal}>
            <Caption>로그아웃</Caption>
          </Button>
        </SubButtonWrap>
      </div>
      <Footer />
    </>
  );
}
