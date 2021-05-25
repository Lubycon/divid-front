import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { parse, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Animals } from 'components/profile';
import _ from 'lodash';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function changeStringToDate(dateString: string) {
  return parse(dateString, 'yyyy-MM-dd', new Date());
}

export function makeDateFormat(date: Date) {
  return format(date, 'M.ddeee', { locale: ko });
}

export function numberWithCommas(number: number) {
  return number.toLocaleString();
}

export const calcRate = (num1: number, num2: number) => (num1 / num2) * 100;

export function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = _.debounce(() => {
      setIsScrolled(!!window.scrollY);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });
  console.log(isScrolled);

  return isScrolled;
}

export function usePageInfo() {
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
      pathRegEx: /\/myinfo/,
      title: '내 프로필 수정'
    }
  ];
  const result = pages.find(({ pathRegEx }) => pathRegEx.test(window.location.href));

  if (result === undefined) {
    return;
  }
  return result.title;
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
