import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../constants/styles';

const LoadingOverlay = () => {
  return (
    <View style={styles.containers}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
