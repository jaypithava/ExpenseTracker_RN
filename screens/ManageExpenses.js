import {StyleSheet, View} from 'react-native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import IconButton from '../UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ExpensesOutput/ManageExpense/ExpenseForm';
import {storeExpenses, updateExpenses, deleteExpenses} from '../utils/http';
import LoadingOverlay from '../UI/LoadingOverlay';

export default function ManageExpenses({route, navigation}) {
  const [isFetching, setIsFetching] = useState(false);
  const expensesUseContext = useContext(ExpensesContext);
  const editedExpenseID = route.params?.expenseId;
  const isEdited = !!editedExpenseID;

  const selectedExpense = expensesUseContext.expenses.find(
    expense => expense.id === editedExpenseID,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEdited]);

  async function deleteExpensesHandler() {
    setIsFetching(true);
    await deleteExpenses(editedExpenseID);
    expensesUseContext.deleteExpenses(editedExpenseID);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  async function confirmHandler(expensesData) {
    setIsFetching(true);
    if (isEdited) {
      expensesUseContext.updateExpenses(editedExpenseID, expensesData);
      await updateExpenses(editedExpenseID, expensesData);
    } else {
      const id = await storeExpenses(expensesData);
      expensesUseContext.addExpenses({...expensesData, id: id});
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEdited ? 'Update' : 'Add'}
        defaultValue={selectedExpense}
      />
      {isEdited && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpensesHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
