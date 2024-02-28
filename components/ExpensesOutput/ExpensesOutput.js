import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import {GlobalStyles} from '../../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of book',
    amount: 49,
    date: new Date('2024-12-19'),
  },
  {
    id: 'e3',
    description: 'A pair of shoes',
    amount: 69,
    date: new Date('2023-12-19'),
  },
  {
    id: 'e4',
    description: 'A pair of book',
    amount: 79,
    date: new Date('2023-2-20'),
  },
];

const ExpensesOutput = ({expenses, expensesPeriod}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.accent500,
  },
});
