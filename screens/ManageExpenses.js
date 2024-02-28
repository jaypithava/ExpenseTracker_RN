import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';

export default function ManageExpenses({route, navigation}) {
  const editedExpenseID = route.params?.expenseId;
  const isEdited = !!editedExpenseID;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEdited]);

  return (
    <View>
      <Text>ManageExpenses</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
