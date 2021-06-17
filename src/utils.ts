import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { parse, format } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import { ko } from 'date-fns/locale';
import { Animals } from 'components/profile';
import _ from 'lodash';

export function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

export function useCheckDesktop() {
  return useMediaQuery({ query: '(min-width: 640px)' });
}

export function changeStringToDate(dateString: string) {
  return parse(dateString, 'yyyy-MM-dd', new Date());
}

export function makeDateFormat(date: Date) {
  return format(date, 'M.deee', { locale: ko });
}

export function makeDateFormat2(date: Date) {
  return format(date, 'MM.dd', { locale: ko });
}

export function changeDateToString(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function numberWithCommas(number: number) {
  return number.toLocaleString();
}

export const calcRate = (num1: number, num2: number) => (num1 / num2) * 100;

export function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      setIsScrolled(!!window.scrollY);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return isScrolled;
}

export function isProjectsPage() {
  const homePath = /\/projects/;
  return homePath.test(window.location.href);
}

export function isHomePage() {
  const homePath = /\/home/;
  return homePath.test(window.location.href);
}

export function getPageInfo() {
  const pages: { pathRegEx: RegExp; title: string }[] = [
    {
      pathRegEx: /\/create/,
      title: '여행 추가'
    },
    {
      pathRegEx: /\/trip\/[0-9]+\/expense/,
      title: '쓴 돈 추가'
    },
    {
      pathRegEx: /\/mypage/,
      title: '내 프로필 수정'
    },
    {
      pathRegEx: /\/modify/,
      title: '여행 정보 수정'
    },
    {
      pathRegEx: /\/service/,
      title: '서비스 정보'
    },
    {
      pathRegEx: /\/privacy/,
      title: '개인정보처리방침'
    },
    {
      pathRegEx: /\/terms/,
      title: '이용약관'
    },
    {
      pathRegEx: /\/detail/,
      title: '상세 내역'
    }
  ];
  const result = pages.find(({ pathRegEx }) => pathRegEx.test(window.location.href));

  if (result === undefined) {
    return;
  }
  return result.title;
}

export function getHeaderButton() {
  const pages: { pathRegEx: RegExp; label: string; link: string }[] = [
    {
      pathRegEx: /\/projects/,
      label: '여행 추가',
      link: '/create'
    },
    {
      pathRegEx: /\/trips/,
      label: '수정',
      link: '/modify'
    }
  ];

  const result = pages.find(({ pathRegEx }) => pathRegEx.test(window.location.href));

  if (result === undefined) {
    return;
  }

  const button = { label: result.label, link: result.link };
  return button;
}

export function typeToEmoji(type: Animals) {
  switch (type) {
    case 'bear':
      return '🐻';
    case 'puppy':
      return '🐶';
    case 'unicorn':
      return '🦄';
    case 'hamster':
      return '🐹';
    case 'fox':
      return '🦊';
    case 'panda':
      return '🐼';
    case 'tiger':
      return '🐯';
    case 'rabbit':
      return '🐰';
    default:
      return '🐹';
  }
}

export function convertNewlineToBr(text: string) {
  return text.replace(/\n/g, '<br />');
}

export function createMarkup(text: string) {
  return { __html: text };
}

export function getLocalStorage<T>(key: string) {
  const value = localStorage.getItem(key);
  if (value !== null) {
    return JSON.parse(value) as T;
  } else {
    return null;
  }
}

export function setLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getKeys<T>(data: T): Array<keyof typeof data> {
  return Object.keys(data) as Array<keyof typeof data>;
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
