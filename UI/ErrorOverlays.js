import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../constants/styles';
import Button from './Button';

const ErrorOverlays = ({Message, onConfirm}) => {
  return (
    <View style={styles.containers}>
      <Text style={[styles.title, styles.text]}>An Error occurred!</Text>
      <Text style={styles.text}>{Message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlays;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
