import React from 'react';
import { basicWrap } from 'styles/containers';
import { css } from '@emotion/react';
import color from 'styles/colors';
import FloatingActionButton from 'components/floating-action-button';

import LogList from './log-list';
import Empty from './empty';
import Header from './header';

const DUMMY = {
  id: 1,
  name: '강원도 우정여행',
  startDate: '2021-05-13',
  endDate: '2021-05-13',
  memberCount: 2,
  hasLog: false,
  give: 200000,
  take: 400000,
  endYn: false
};

export default function Trip() {
  return (
    <div
      css={[
        basicWrap,
        css`
          background-color: ${color.grayscale.gray07};
        `
      ]}
    >
      <Header name={DUMMY.name} startDate={DUMMY.startDate} endDate={DUMMY.endDate} />
      {DUMMY.hasLog ? (
        <Empty memberCount={DUMMY.memberCount} />
      ) : (
        <LogList giveMoneyAmount={DUMMY.give} takeMoneyAmount={DUMMY.take} />
      )}

      <FloatingActionButton />
    </div>
  );
}
