import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { Link } from 'react-router-dom';
import { mediaQuery, pxToVw } from 'styles/media';
import { flexAlignCenter, flexCenter } from 'styles/containers';
import { CaptionBold } from 'styles/typography';
import { Close } from 'styles/icon';
import Welcome from './welcome';
import ArrowTab from '../arrow-tab';

const emailFormat =
  '디빗팀에게 건의하고 싶으신 아이디어가 있으신가요?🙂 %0D%0A자유롭게 메일로 남겨주시면 더 나은 디빗 서비스를 만드는데 큰 도움이 될 것 같아요🌷 %0D%0A— 디빗팀 —';

const Wrap = styled.div`
  background: ${color.white};
  height: 100vh;
  width: ${pxToVw(262)};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  ${mediaQuery(640)} {
    width: 280px;
  }
`;

const UpperWrap = styled.div`
  padding: 0 ${pxToVw(24)} 0;
  border-bottom: 10px solid ${color.grayscale.gray07};

  ${mediaQuery(640)} {
    padding: 0 24px;
  }
`;

const LowerWrap = styled.div`
  padding: ${pxToVw(20)} ${pxToVw(24)};

  ${mediaQuery(640)} {
    padding: 20px 24px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${color.grayscale.gray06};
`;

const Tab = styled(Link)`
  ${flexAlignCenter};
  height: ${pxToVw(60)};

  ${mediaQuery(640)} {
    height: 60px;
  }
`;

const TabMail = styled.a`
  ${flexAlignCenter};
  height: ${pxToVw(60)};

  ${mediaQuery(640)} {
    height: 60px;
  }
`;

const CloseButton = styled.div`
  width: ${pxToVw(48)};
  height: ${pxToVw(48)};
  ${flexCenter};
  position: fixed;
  top: 5px;
  left: 20px;

  ${mediaQuery(640)} {
    width: 48px;
    height: 48px;
  }
`;

export const naviStyle = {
  content: {
    outline: 'none',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.3s'
  }
};

interface NavigationProps {
  isNaviOpened: boolean;
  onRequestClose: () => void;
}

ReactModal.setAppElement('body');

export default function Navigation({ isNaviOpened, onRequestClose }: NavigationProps) {
  return (
    <ReactModal
      isOpen={isNaviOpened}
      onRequestClose={onRequestClose}
      style={naviStyle}
      className="ignore-default-style"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick
    >
      <Wrap>
        <CloseButton onClick={onRequestClose}>
          <Close />
        </CloseButton>
        <UpperWrap onClick={onRequestClose}>
          <Link to="/mypage">
            <Welcome />
          </Link>
          <ArrowTab label="홈" isBorderTop />
        </UpperWrap>
        <LowerWrap onClick={onRequestClose}>
          <Tab to="/service">
            <CaptionBold>서비스 정보</CaptionBold>
          </Tab>
          <Divider />
          <TabMail
            href={`mailto:4divid.official@gmail.com?body=${emailFormat}&subject=[디빗팀에게 건의하기]&bcc=hyounga9595@gmail.com`}
          >
            <CaptionBold>건의하기</CaptionBold>
          </TabMail>
        </LowerWrap>
      </Wrap>
    </ReactModal>
  );
}
