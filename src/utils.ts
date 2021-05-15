import { useLocation } from 'react-router';
import { parse, format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useDateFormat(dateString: string) {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  const result = format(date, 'M.ddeee', { locale: ko });
  return result;
}

export function useNumberWithCommas(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
