import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'styles/media';
// import { flexAlignCenter } from 'styles/containers';
import color from 'styles/colors';
import { flexCenter } from 'styles/containers';
import { Heading2, Heading7 } from 'styles/typography';
import { CustomButton } from './first-section';

const Section = styled.div`
  background: ${color.primary};
  background-size: cover;
  ${flexCenter};
  flex-direction: column;

  ${mediaQuery(640)} {
    height: 340px;
  }
`;

const Section2 = styled(Section)`
  ${mediaQuery(640)} {
    height: 480px;
  }
`;

const Text = styled(Heading2)`
  color: ${color.white};
  text-align: center;
  margin: 8px 0;
`;

const Label = styled(Heading7)`
  color: ${color.primary};
`;

const Button = styled(CustomButton)`
  background: ${color.white};

  ${mediaQuery(640)} {
    margin: 10px 0 0;
  }
`;

export default function TextSection() {
  return (
    <Section>
      <Text>정산에 대한 걱정은 모두 잊으세요</Text>
      <Text>당신이 여행을 즐기는 동안 디빗이 정산할게요!</Text>
    </Section>
  );
}

export function TextSection2() {
  return (
    <Section2>
      <Text>지금 바로 디빗과 함께 떠나세요.</Text>
      <Text>여행은 즐기기만 해도 모자르니까!</Text>
      <Button>
        <Label>지금 시작하기</Label>
      </Button>
    </Section2>
  );
}
