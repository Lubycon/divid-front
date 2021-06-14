import React from 'react';
import styled from '@emotion/styled';
import { basicWrap } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';
import { Heading4, Heading7, Caption as CaptionCommon } from 'styles/typography';
import color from 'styles/colors';
import Button, { ButtonType } from 'components/button';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  ${basicWrap};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div`
  width: ${pxToVw(190)};
  height: ${pxToVw(148)};
  background: url('/images/404.svg') no-repeat center;
  background-size: contain;

  ${mediaQuery(640)} {
    width: 240px;
    height: 184px;
  }
`;

export const CustomButton = styled(Button)`
  width: ${pxToVw(146)};
  height: ${pxToVw(50)};
  border-radius: 100px;
  margin-top: ${pxToVw(30)};

  ${mediaQuery(640)} {
    width: 146px;
    height: 50px;
    margin-top: 30px;
  }
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

const Title = styled(Heading4)`
  color: ${color.primary};
  margin: ${pxToVw(23)} 0 ${pxToVw(10)};

  ${mediaQuery(640)} {
    margin: 23px 0 10px;
  }
`;

const Caption = styled(CaptionCommon)`
  color: ${color.grayscale.gray04};
`;

export default function Error404() {
  return (
    <Wrap>
      <Img />
      <Title>앗, 페이지를 찾을 수 없어요!</Title>
      <Caption>입력한 주소가 정확한지 다시 한 번 확인해주세요.</Caption>
      <Link to="/">
        <CustomButton buttonType={ButtonType.Square}>
          <Label>홈으로 돌아가기</Label>
        </CustomButton>
      </Link>
    </Wrap>
  );
}
