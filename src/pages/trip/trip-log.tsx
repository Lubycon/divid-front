import React from 'react';
import { TripInfo } from 'api/types';
import LogList from './log-list';
import Empty from './empty';

export default function TripLog({ trip }: { trip: TripInfo }) {
  const BOOLEAN = false;
  return (
    <>
      {BOOLEAN ? (
        <Empty memberCount={trip.userInfoResponseList.length} />
      ) : (
        <LogList giveMoneyAmount={1247000} takeMoneyAmount={8399000} />
      )}
    </>
  );
}
