import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TimerSetting from '../screens/Timer/TimerSetting';
import TimerRunning from '../screens/Timer/TimerRunning';

const Stack = createStackNavigator();

const TimerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TimerSetting" component={TimerSetting} />
      <Stack.Screen name="TimerRunning" component={TimerRunning} />
    </Stack.Navigator>
  );
};

export default TimerStackNavigator;
