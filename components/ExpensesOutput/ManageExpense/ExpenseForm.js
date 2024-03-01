import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import Input from './Input';
import Button from '../../../UI/Button';

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel}) => {
  const [inputValue, setInputValue] = useState({
    amount: '',
    date: '',
    description: '',
  });

  function amountChangeHandler(inputIdentifier, enterAmount) {
    setInputValue(currentInputValue => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enterAmount,
      };
    });
  }

  function submitHandler() {
    const expensesData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };
    onSubmit(expensesData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>YOUR EXPENSE</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangeHandler.bind(this, 'amount'),
            value: inputValue.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: amountChangeHandler.bind(this, 'date'),
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: amountChangeHandler.bind(this, 'description'),
          value: inputValue.description,
          //   autoCorrect: false,
          //   autoCapitalize: 'none',
          //onChangeText: () => {},
        }}
      />
      <View style={styles.button}>
        <Button style={styles.buttonText} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.buttonText} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
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
});