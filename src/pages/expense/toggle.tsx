import React from 'react';
import styled from '@emotion/styled';
import color from 'styles/colors';
import { Badge } from 'styles/typography';
import { flexCenter } from 'styles/containers';
import { mediaQuery, pxToVw } from 'styles/media';

const Wrap = styled.div`
  input[type='checkbox'] {
    display: none;
  }

  label {
    position: relative;
    transition: all 0.3s ease-in-out;
  }

  label > div {
    width: ${pxToVw(57)};
    height: ${pxToVw(30)};
    background-color: ${color.white};
    border-radius: 100px;
    box-sizing: border-box;
    ${flexCenter};
    position: absolute;
    transition: all 0.3s ease-in-out;

    ${mediaQuery(640)} {
      width: 57px;
      height: 30px;
    }
  }

  input[type='checkbox'] + label {
    width: ${pxToVw(72)};
    height: ${pxToVw(30)};
    display: flex;
    align-items: center;
    background: ${color.grayscale.gray05};
    border-radius: 100px;
    cursor: pointer;

    ${mediaQuery(640)} {
      width: 72px;
      height: 30px;
    }

    div {
      border: 1px solid ${color.grayscale.gray05};
      color: ${color.grayscale.gray04};
      left: 0;
    }
  }

  input[type='checkbox']:checked + label {
    background: ${color.primary};

    div {
      border: 1px solid ${color.primary};
      color: ${color.primary};
      left: ${pxToVw(15)};

      ${mediaQuery(640)} {
        left: 15px;
      }
    }
  }
`;

export default function Toggle({ isIndividual, onToggle }: { isIndividual: boolean; onToggle: () => void }) {
  return (
    <Wrap>
      <input id="toggleDutch" type="checkbox" checked={!isIndividual} onClick={onToggle} />
      <label htmlFor="toggleDutch">
        <div>
          <Badge>1/N 하기</Badge>
        </div>
      </label>
    </Wrap>
  );
}
