import {FlatList, Text} from 'react-native';
import React from 'react';
import ExpensesItem from './ExpensesItem';

function renderExpensesItem(itemData) {
  return <ExpensesItem {...itemData.item} />;
}

const ExpensesList = ({expenses}) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ExpensesList;
