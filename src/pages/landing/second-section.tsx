import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import { flexAlignCenter } from 'styles/containers';
import color from 'styles/colors';
import { Heading1 } from 'styles/typography';
import { useCheckDesktop } from 'utils';

const SecondPart = styled.div`
  background: ${color.grayscale.gray07};
  background-size: cover;
  display: flex;
  justify-content: center;
  height: ${pxToVw(697)};

  ${mediaQuery(640)} {
    height: 880px;
  }
`;

const Content = styled.div`
  width: 100%;
  ${flexAlignCenter};
  flex-direction: column;
  position: relative;

  ${mediaQuery(640)} {
    width: 1200px;
  }
`;

const Title = styled(Heading1)`
  font-size: ${pxToVw(28)};
  text-align: center;
  margin-top: ${pxToVw(80)};
  margin-bottom: ${pxToVw(32)};

  ${mediaQuery(640)} {
    margin-top: 125px;
    margin-bottom: 32px;
  }
`;

const Bubble = styled.div`
  background: ${color.white};
  ${flexAlignCenter};
  width: ${pxToVw(327)};
  height: ${pxToVw(100)};
  border-radius: 0 40px 40px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: ${pxToVw(16)};
  padding-right: ${pxToVw(16)};
  box-sizing: border-box;

  &:nth-of-type(odd) {
    border-radius: 40px 0 40px 40px;
  }

  ${mediaQuery(640)} {
    width: 640px;
    height: 122px;
    margin-bottom: 24px;
    margin-right: 108px;
    padding: 0;

    &:nth-of-type(odd) {
      margin-left: 108px;
      margin-right: 0;
    }
  }
`;

const RoundImg = styled.div<{ index: number }>`
  background: url('/images/char-img_0${({ index }) => index}.svg') no-repeat center;
  background-size: contain;
  width: ${pxToVw(74)};
  height: ${pxToVw(74)};
  margin: 0 ${pxToVw(16)} 0 ${pxToVw(12)};

  ${mediaQuery(640)} {
    width: 74px;
    height: 74px;
    margin: 0 16px 0 32px;
  }
`;

const Message = styled.p`
  font-weight: 700;
  color: ${color.grayscale.gray02};
  font-size: ${pxToVw(18)};

  & > p {
    color: ${color.primary};
    font-weight: 800;
    margin-bottom: ${pxToVw(8)};
    font-size: ${pxToVw(16)};
  }

  ${mediaQuery(640)} {
    font-size: 24px;

    & > p {
      font-size: 24px;
      margin-bottom: 8px;
    }
  }
`;

const CharThoughts = styled.div`
  background: url('/images/Frame 881.svg') no-repeat center;
  background-size: contain;
  position: absolute;
  bottom: 0;
  width: ${pxToVw(204)};
  height: ${pxToVw(142)};

  ${mediaQuery(640)} {
    width: 284px;
    height: 198px;
  }
`;

export default function SecondSection() {
  const isDesktop = useCheckDesktop();

  return (
    <SecondPart>
      <Content>
        <Title>여행 정산 과정에 {isDesktop ? null : <br />}지치셨나요?</Title>
        {BUBBLE_DATA.map((b) => (
          <Bubble>
            <RoundImg index={b.id} />
            <Message>
              <p>{b.name}</p>
              {b.desc}
            </Message>
          </Bubble>
        ))}
        <CharThoughts />
      </Content>
    </SecondPart>
  );
}

const BUBBLE_DATA = [
  { id: 1, name: '술찌', desc: '나는 맥주 안 마셨는데 1/N 하는 건 좀 아니잖아' },
  { id: 2, name: '귀차니즘', desc: '여러 명이 결제했더니 한 번에 정산하기 어려운 걸?' },
  { id: 3, name: '프로총무러', desc: '돈 보내달라고 독촉하기 힘드네 ㅠㅠ' }
];
