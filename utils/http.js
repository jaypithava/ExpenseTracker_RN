import axios from 'axios';

const FIREBASE_BASE_URL =
  'https://expensestrackerdemo-default-rtdb.firebaseio.com';

export function storeExpenses(expensesData) {
  axios.post(FIREBASE_BASE_URL + '/expenses.json', expensesData);
}

export async function fetchExpenses() {
  const response = await axios.get(FIREBASE_BASE_URL + '/expenses.json');

  const expenses = [];
  console.log('Response:' + JSON.stringify(response.data));
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
    console.log('Response:' + JSON.stringify(expenseObj));
  }
  return expenses;
}
