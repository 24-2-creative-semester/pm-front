import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BattleMain from '../screens/Battle/BattleMain';
import BattleCreate from '../screens/Battle/BattleCreate';
import BattleCreateSecond from '../screens/Battle/BattleCreateSecond';
import BattleList from '../screens/Battle/BattleList';
import BattleOpponentDiet from '../screens/Battle/BattleOpponentDiet';
import BattleOtherState from '../screens/Battle/BattleOtherState';
import BattleParticipate from '../screens/Battle/BattleParticipate';
import BattleResult from '../screens/Battle/BattleResult';

const Stack = createStackNavigator();

const BattleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BattleMain" component={BattleMain} />
      <Stack.Screen name="BattleCreate" component={BattleCreate} />
      <Stack.Screen name="BattleCreateSecond" component={BattleCreateSecond} />
      <Stack.Screen name="BattleList" component={BattleList} />
      <Stack.Screen name="BattleOpponentDiet" component={BattleOpponentDiet} />
      <Stack.Screen name="BattleOtherState" component={BattleOtherState} />
      <Stack.Screen name="BattleParticipate" component={BattleParticipate} />
      <Stack.Screen name="BattleResult" component={BattleResult} />
    </Stack.Navigator>
  );
};

export default BattleStackNavigator;
