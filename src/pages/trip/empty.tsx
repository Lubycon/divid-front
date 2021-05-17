import React from 'react';
import styled from '@emotion/styled';
import { Caption } from 'styles/typography';
import color from 'styles/colors';

const Wrap = styled.div`
  min-height: calc(100vh - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Desc = styled(Caption)`
  color: ${color.grayscale.gray03};
  text-align: center;
`;

interface EmptyProps {
  memberCount: number;
}

export default function Empty({ memberCount }: EmptyProps) {
  if (memberCount < 2) {
    return (
      <Wrap>
        <Desc>아직 친구들이 들어오지 않았어요!</Desc>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Desc>
        아직 내역이 없어요.
        <br />
        아래의 버튼을 눌러 내역을 추가해주세요.
      </Desc>
    </Wrap>
  );
}
