import React from 'react';
import { Link } from 'react-router-dom';
import { basicWrap } from 'styles/containers';
import ArrowTab from 'components/arrow-tab';

export default function ServiceInfo() {
  return (
    <div css={basicWrap}>
      <Link to="/privacy">
        <ArrowTab label="개인정보처리방침" />
      </Link>
      <Link to="/terms">
        <ArrowTab label="이용약관" isBorderTop />
      </Link>
    </div>
  );
}
