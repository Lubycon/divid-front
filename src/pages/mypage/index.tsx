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
import { mediaQuery, pxToVw } from 'styles/media';

const IconSelector = styled.div`
  padding: 6.1333333333vw 0 5.0666666667vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQuery(640)} {
    padding: 23px 0 19px;
  }
`;

const Icons = styled.div`
  width: 50.1333333333vw;
  height: 25.6vw;
  margin-top: 4.2666666667vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mediaQuery(640)} {
    width: 188px;
    height: 96px;
    margin-top: 16px;
  }
`;

const ProfileWrap = styled.div`
  margin-bottom: 2.1333333333vw;
  z-index: 2;
  position: relative;
  cursor: pointer;

  ${mediaQuery(640)} {
    margin-bottom: 8px;
  }
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
  margin-top: ${pxToVw(32)};

  ${mediaQuery(640)} {
    margin-top: 32px;
  }
`;

const SubButtonWrap = styled(CommonButtonWrap)`
  margin-top: ${pxToVw(57)};

  ${mediaQuery(640)} {
    margin-top: 57px;
  }
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

  const handleChange = _.throttle((value: string) => {
    const newValue = value.replace(/^\s+|\s+$/g, '');
    setNickname(newValue);
  }, 500);

  const handleSubmit = async () => {
    await modifyMyinfo();
    history.push('/projects');
  };

  const LogoutModalContents = (
    <ButtonModal
      title="????????????"
      body="?????? ???????????? ????????????????"
      buttons={{
        left: {
          label: '??????'
        },
        right: {
          label: '????????????',
          handleClick: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            history.push('/home');
          }
        }
      }}
    />
  );

  const WithdrawModalContents = (
    <ButtonModal
      type="withdraw"
      title="?????? ??????????????????????"
      body="????????? ???????????? ?????? ????????????????????? ?????? ????????????. ????????? ??????????????????????"
      buttons={{
        left: {
          label: '??????',
          handleClick: () => {
            postWithdrawal();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            history.push('/home');
          }
        },
        right: {
          label: '??????',
          handleClick: () => {}
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
          label="??????"
          note="?????? 1??? ?????? 4??? ??????????????????."
          defaultValue={nickname}
          onChangeInput={handleChange}
          maxLength={4}
          minLength={1}
        />
        <ButtonWrap>
          <Button onClick={handleSubmit} disabled={!nickname.length}>
            <Label>??????</Label>
          </Button>
        </ButtonWrap>
        <SubButtonWrap>
          <Button buttonType={ButtonType.Text} onClick={openWithdrawModal}>
            <Caption>????????????</Caption>
          </Button>
          <Divider />
          <Button buttonType={ButtonType.Text} onClick={openLogoutModal}>
            <Caption>????????????</Caption>
          </Button>
        </SubButtonWrap>
      </div>
      <Footer />
    </>
  );
}
