import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'styles/media';
import color from 'styles/colors';
import { Heading1, Heading6 } from 'styles/typography';
import { convertNewlineToBr, createMarkup } from 'utils';

const Section = styled.div`
  background: ${color.white};
  background-size: cover;
  display: flex;
  justify-content: center;

  &:nth-child(odd) {
    background: ${color.grayscale.gray07};

    & > div {
      flex-direction: row-reverse;
    }
  }

  ${mediaQuery(640)} {
    height: 800px;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${mediaQuery(640)} {
    width: 1200px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 100px;
`;

const ScreenImg = styled.img`
  width: 440px;
  height: 600px;
`;

const Desc = styled(Heading6)`
  color: ${color.grayscale.gray02};
  font-weight: normal;
  margin: 32px 0 280px;
`;

export default function ScreenSection() {
  return (
    <>
      {DESC_DATA.map((d) => (
        <Section>
          <Content>
            <ScreenImg src={d.img} />
            <TextBox>
              <Heading1 dangerouslySetInnerHTML={createMarkup(convertNewlineToBr(d.title))} />
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
