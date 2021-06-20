import React from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from 'styles/media';
import FirstSection from './first-section';
import SecondSection from './second-section';
import TextSection, { TextSection2 } from './text-section';
import ScreenSection from './screen-section';
import Footer from './footer';

const Wrap = styled.div`
  width: 100%;

  ${mediaQuery(640)} {
    /* width: 1920px; */
  }
`;

export default function Landing() {
  console.log('디비디비디빗!* ੈ✩‧₊˚* ੈ✩‧₊  ');
  return (
    <Wrap>
      <FirstSection />
      <SecondSection />
      <TextSection />
      <ScreenSection />
      <TextSection2 />
      <Footer />
    </Wrap>
  );
}
