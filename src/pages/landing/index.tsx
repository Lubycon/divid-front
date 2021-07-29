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
  function getEasterEgg() {
    const messages = [
      '☆.｡･:*:･ﾟ`☆､｡･:*:･ﾟ`★.｡･:*:･ﾟ`☆.｡･:☆♪',
      '',
      '        ❤️‍🔥 디빗을 만든 사람들 ❤️‍🔥       ',
      '',
      'frontend developer * ੈ✩‧₊˚* ੈ✩‧₊  ',
      '* 이지형 Jihyung Lee 🐯',
      '* github: @MiaJLee',
      '* email: hyounga9595@gmail.com',
      ' ',
      'backend developer * ੈ✩‧₊˚* ੈ✩‧₊  ',
      '* 신유진 🥕',
      '* 신유진 1',
      '* 신유진 2',
      ' ',
      'product designer * ੈ✩‧₊˚* ੈ✩‧₊  ',
      '* 강주예 🐹',
      '* 강주예 1',
      '* 강주예 2',
      ' ',
      'supervisor * ੈ✩‧₊˚* ੈ✩‧₊  ',
      '* 이영진 🦄',
      '* 이영진 1',
      '* 이영진 2',
      '',
      '☆.｡･:*:･ﾟ`☆､｡･:*:･ﾟ`★.｡･:*:･ﾟ`☆.｡･:☆♪'
    ];

    messages.map((message) => console.info(message));
  }

  getEasterEgg();

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
