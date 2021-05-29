import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { basicWrap } from 'styles/containers';
import { Caption } from 'styles/typography';
import { convertNewlineToBr, createMarkup } from 'utils';
import { privacyParagraph, termsParagraph } from './data';

const Paragraph = styled(Caption)`
  margin-top: 8px;

  span {
    font-weight: 600;
  }
`;

export default function Information() {
  const content = useLocation().pathname.includes('privacy') ? privacyParagraph : termsParagraph;
  const newParagraph = convertNewlineToBr(content);

  return (
    <div css={basicWrap}>
      <Paragraph dangerouslySetInnerHTML={createMarkup(newParagraph)} />
    </div>
  );
}
