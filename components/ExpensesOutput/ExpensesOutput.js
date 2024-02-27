import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of book',
    amount: 49.99,
    date: new Date('2024-12-19'),
  },
  {
    id: 'e3',
    description: 'A pair of shoes',
    amount: 69.99,
    date: new Date('2023-12-19'),
  },
];

const ExpensesOutput = ({expenses, expensesPeriod}) => {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({});
