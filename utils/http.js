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

export function updateExpenses(id, expensesData) {
  return axios.put(FIREBASE_BASE_URL + `/expenses/${id}.json`, expensesData);
}

export async function deleteExpenses(id) {
  return axios.delete(FIREBASE_BASE_URL + `/expenses/${id}.json`);
}
