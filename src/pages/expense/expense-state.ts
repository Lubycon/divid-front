import { changeDateToString } from 'utils';
import { atom } from 'recoil';

interface ExpenseInfo {
  userId: number;
  price: number;
}

interface AssigneeInfo {
  userId: number;
  isAssigned: boolean;
}

export const expenseState = atom({
  key: 'expenseState',
  default: {
    payerId: 0,
    payDate: changeDateToString(new Date()),
    totalPrice: 0,
    title: '',
    individual: true,
    expenseDetails: [] as ExpenseInfo[],
    tripId: ''
  }
});

export const expenseAssigneeState = atom({
  key: 'expenseAssigneeState',
  default: {
    members: [] as AssigneeInfo[]
  }
});

export default {};
