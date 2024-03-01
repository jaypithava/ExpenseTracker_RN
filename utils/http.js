import axios from 'axios';

const FIREBASE_BASE_URL =
  'https://expensestrackerdemo-default-rtdb.firebaseio.com';

export function storeExpenses(expensesData) {
  const response = axios.post(
    FIREBASE_BASE_URL + '/expenses.json',
    expensesData,
  );
  const id = response;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(FIREBASE_BASE_URL + '/expenses.json');

  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}
