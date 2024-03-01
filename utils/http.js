import axios from 'axios';

export function storeExpenses(expensesData) {
  axios.post(
    'https://expensestrackerdemo-default-rtdb.firebaseio.com/expenses.json',
    expensesData,
  );
}
