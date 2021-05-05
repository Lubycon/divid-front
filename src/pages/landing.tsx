import React from 'react';
import { atom, useRecoilState } from 'recoil';

const sampleState = atom({
  key: 'numberState',
  default: 0
});

export default function Landing() {
  const [number, setNumber] = useRecoilState(sampleState);

  return (
    <div>
      <p>{number}</p>
      <button type="button" onClick={() => setNumber(number + 1)}>
        click
      </button>
    </div>
  );
}
