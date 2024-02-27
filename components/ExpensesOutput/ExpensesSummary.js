import {View, Text} from 'react-native';
import React from 'react';

export default function ExpensesSummary({expenses, periodName}) {
  const expensesSum = expenses.reduce((sum, expenses) => {
    return sum + expenses.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
