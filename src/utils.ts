import { useLocation } from 'react-router';
import { parse, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Animals } from 'components/profile';

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

export function getProfileAnimalType(type: string) {
  switch (type) {
    case 'puppy': {
      return Animals.Puppy;
    }
    case 'bear': {
      return Animals.Bear;
    }
    case 'unicorn': {
      return Animals.Unicorn;
    }
    case 'hamster': {
      return Animals.Hamster;
    }
    case 'fox': {
      return Animals.Fox;
    }
    case 'panda': {
      return Animals.Panda;
    }
    case 'tiger': {
      return Animals.Tiger;
    }
    case 'rabbit': {
      return Animals.Rabbit;
    }
    default: {
      return Animals.Puppy;
    }
  }
}
