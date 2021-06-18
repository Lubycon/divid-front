import { changeDateToString } from 'utils';
import { atom } from 'recoil';

interface ExpenseInfo {
  userId: number;
  price: number;
}

export const expenseState = atom({
  key: 'expenseState',
  default: {
    payerId: 0,
    payDate: changeDateToString(new Date()),
    totalPrice: 0,
    title: '',
    individual: false,
    expenseDetails: [] as ExpenseInfo[],
    tripId: ''
  }
});

export default {};
