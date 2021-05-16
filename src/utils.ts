import { useLocation } from 'react-router';
import { parse, format } from 'date-fns';
import { ko } from 'date-fns/locale';

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
