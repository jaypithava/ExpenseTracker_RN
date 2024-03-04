import {useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {getDateMinusDate} from '../utils/date';
import {fetchExpenses} from '../utils/http';
import {ExpensesContext} from '../store/expenses-context';
import LoadingOverlay from '../UI/LoadingOverlay';

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      const expense = await fetchExpenses();
      setIsFetching(false);
      expenseCtx.setExpenses(expense);
    }
    getExpenses();
  });

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenseCtx.expenses.filter(expense => {
    const today = new Date();
    const date7daysAgo = getDateMinusDate(today, 7);

    return expense.date >= date7daysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No Expenses added for the last 7 days!!!"
    />
  );
}
