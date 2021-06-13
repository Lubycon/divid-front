import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import color from 'styles/colors';
import { Heading3, Heading } from 'styles/typography';
import { convertNewlineToBr, createMarkup } from 'utils';

const Section = styled.div`
  background: ${color.white};
  background-size: cover;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: ${pxToVw(650)};
  padding: 0 ${pxToVw(24)};

  &:nth-child(odd) {
    background: ${color.grayscale.gray07};
  }

  ${mediaQuery(640)} {
    height: 800px;
    padding: 0;
    justify-content: center;

    &:nth-child(odd) {
      & > div {
        flex-direction: row-reverse;
      }
    }

    & > div {
      flex-direction: row;
    }
  }
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column-reverse;

  ${mediaQuery(640)} {
    width: 1200px;
    flex-direction: row;
    justify-content: center;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${pxToVw(99)} 0 ${pxToVw(60)};

  ${mediaQuery(640)} {
    margin: 0 100px;
  }
`;

const ScreenImg = styled.img`
  width: ${pxToVw(250)};
  height: ${pxToVw(458)};
  align-self: center;

  ${mediaQuery(640)} {
    width: 440px;
    height: 600px;
    align-self: flex-end;
  }
`;

const Desc = styled(Heading)`
  color: ${color.grayscale.gray02};
  font-weight: normal;
  font-size: ${pxToVw(16)};
  margin-top: ${pxToVw(16)};

  ${mediaQuery(640)} {
    margin: 32px 0 280px;
    font-size: 18px;
  }
`;

const Title = styled(Heading3)`
  ${mediaQuery(640)} {
    font-size: 45px;
  }
`;

export default function ScreenSection() {
  return (
    <>
      {DESC_DATA.map((d) => (
        <Section>
          <Content>
            <ScreenImg src={d.img} />
            <TextBox>
              <Title dangerouslySetInnerHTML={createMarkup(convertNewlineToBr(d.title))} />
              <Desc dangerouslySetInnerHTML={createMarkup(convertNewlineToBr(d.desc))} />
            </TextBox>
          </Content>
        </Section>
      ))}
    </>
  );
}

const DESC_DATA = [
  {
    title: '1/N 은 기본, \n따로 입력도 문제없어요',
    desc: '디빗에 쓴 돈을 기록해주세요.\n1/N 은 기본, 한 명씩 따로 입력도 가능해요!',
    img: '/images/screen_01.svg'
  },
  {
    title: '한 눈에 볼 수 있는\n정산 그래프',
    desc: '총 얼마나 받고, 갚아야 하는 지 매번 헷갈리시죠?\n알기 쉽게 그래프로 디빗이 알려드려요',
    img: '/images/screen_02.svg'
  },
  {
    title: '공유 한 번으로\n정산 리마인드 끝내기!',
    desc: '독촉 문자 대신 디빗 정산 내역을 공유해주세요.\n버튼 한 번으로 복사하고, 공유만 하면 끝!',
    img: '/images/screen_03.svg'
  }
];
