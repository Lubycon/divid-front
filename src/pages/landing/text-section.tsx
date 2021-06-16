import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { mediaQuery, pxToVw } from 'styles/media';
import { useCheckDesktop } from 'utils';
import color from 'styles/colors';
import { flexCenter } from 'styles/containers';
import { Heading, Heading7 } from 'styles/typography';
import { CustomButton } from './first-section';

const Section = styled.div`
  background: ${color.primary};
  background-size: cover;
  ${flexCenter};
  flex-direction: column;
  height: ${pxToVw(340)};

  ${mediaQuery(640)} {
    height: 340px;
  }
`;

const Section2 = styled(Section)`
  height: ${pxToVw(480)};

  ${mediaQuery(640)} {
    height: 480px;
  }
`;

const Text = styled(Heading)`
  font-size: ${pxToVw(24)};
  text-align: center;
  font-weight: 800;
  color: ${color.white};

  ${mediaQuery(640)} {
    margin: 8px 0;
    font-size: 32px;
  }
`;

const Label = styled(Heading7)`
  color: ${color.primary};
`;

const Button = styled(CustomButton)`
  background: ${color.white};
  margin: ${pxToVw(32)} 0 0;

  ${mediaQuery(640)} {
    margin: 10px 0 0;
  }
`;

export default function TextSection() {
  const isDesktop = useCheckDesktop();

  if (isDesktop) {
    return (
      <Section>
        <Text>정산에 대한 걱정은 {isDesktop ? null : <br />}모두 잊으세요</Text>
        <Text>당신이 여행을 즐기는 동안 {isDesktop ? null : <br />}디빗이 정산할게요!</Text>
      </Section>
    );
  }

  return (
    <Section>
      <Text>
        정산에 대한 걱정은
        <br />
        모두 잊으세요
        <br />
        당신이 여행을 즐기는 동안
        <br />
        디빗이 정산할게요!
      </Text>
    </Section>
  );
}

export function TextSection2() {
  const isDesktop = useCheckDesktop();

  if (isDesktop) {
    return (
      <Section2>
        <Text>지금 바로 디빗과 함께 떠나세요.</Text>
        <Text>여행은 즐기기만 해도 모자르니까!</Text>
        <Link to="/login">
          <Button>
            <Label>지금 시작하기</Label>
          </Button>
        </Link>
      </Section2>
    );
  }

  return (
    <Section2>
      <Text>
        지금 바로 디빗과
        <br />
        함께 떠나세요.
        <br />
        여행은 즐기기만 해도
        <br />
        모자르니까!
      </Text>
      <Link to="/login">
        <Button>
          <Label>지금 시작하기</Label>
        </Button>
      </Link>
    </Section2>
  );
}
