import {Text, View} from 'react-native';
import React from 'react';

import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpenses';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RecentExpenses" component={RecentExpenses} />
      <Tab.Screen name="AllExpenses" component={AllExpenses} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
