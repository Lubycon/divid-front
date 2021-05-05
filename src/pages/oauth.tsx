import React from 'react';
import { useQuery } from 'utils';

export default function Oauth() {
  const code = useQuery().get('code');

  console.log(code);

  return <div>카카오 로그인 중</div>;
}
