import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MateList from '../screens/Mate/MateList';
import MateCreate from '../screens/Mate/MateCreate';
import MyMate from '../screens/Mate/MyMate';

const Stack = createStackNavigator();

const MateStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MateList" component={MateList} />
      <Stack.Screen name="MateCreate" component={MateCreate} />
      <Stack.Screen name="MyMate" component={MyMate} />
    </Stack.Navigator>
  );
};

export default MateStackNavigator;
