import {StyleSheet, View} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import IconButton from '../UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../UI/Button';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ExpensesOutput/ManageExpense/ExpenseForm';

export default function ManageExpenses({route, navigation}) {
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

  function deleteExpensesHandler() {
    expensesUseContext.deleteExpenses(editedExpenseID);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expensesData) {
    if (isEdited) {
      expensesUseContext.updateExpenses(editedExpenseID, expensesData);
    } else {
      expensesUseContext.addExpenses(expensesData);
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
      {/* <View style={styles.button}>
        <Button style={styles.buttonText} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.buttonText} onPress={confirmHandler}>
          {isEdited ? 'Update' : 'Add'}
        </Button>
      </View> */}
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
