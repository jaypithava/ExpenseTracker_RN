import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import Input from './Input';
import Button from '../../../UI/Button';
import {getFormattedDate} from '../../../utils/date';
import {GlobalStyles} from '../../../constants/styles';

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, defaultValue}) => {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });

  function amountChangeHandler(inputIdentifier, enterAmount) {
    setInputValue(currentInputValue => {
      return {
        ...currentInputValue,
        [inputIdentifier]: {value: enterAmount, isValid: true},
      };
    });
  }

  function submitHandler() {
    const expensesData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    const amountIsValid =
      !isNaN(expensesData.amount) && expensesData.amount > 0;
    const dateIsValid = expensesData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expensesData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValue(curInput => {
        return {
          amount: {value: curInput.amount.value, isValid: amountIsValid},
          date: {value: curInput.date.value, isValid: dateIsValid},
          description: {
            value: curInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expensesData);
  }

  const formIsInvalid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>YOUR EXPENSE</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          inValid={!inputValue.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangeHandler.bind(this, 'amount'),
            value: inputValue.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          inValid={!inputValue.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: amountChangeHandler.bind(this, 'date'),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        inValid={!inputValue.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: amountChangeHandler.bind(this, 'description'),
          value: inputValue.description.value,
          //   autoCorrect: false,
          //   autoCapitalize: 'none',
          //onChangeText: () => {},
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input Value - Please check your entered data!
        </Text>
      )}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonText: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
