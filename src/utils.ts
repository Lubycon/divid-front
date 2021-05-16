import { useLocation } from 'react-router';
import { parse, format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function changeStringToDate(dateString: string) {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  return date;
}

export function makeDateFormat(date: Date) {
  const result = format(date, 'M.ddeee', { locale: ko });
  return result;
}

export function numberWithCommas(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
