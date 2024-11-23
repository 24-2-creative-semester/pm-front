import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ProfileSetup from '../screens/User/ProfileSetup';
import BodyMain from '../screens/Record/Body/BodyMain';
import MateCreate from '../screens/Mate/MateCreate';
import MyMate from '../screens/Mate/MyMate';
import Home from '../screens/Home';
import MainTabNavigator from './MainTabNavigator';
import MateList from '../screens/Mate/MateList';
import BattleCreate from '../screens/Battle/BattleCreate';
import BattleCreateSecond from '../screens/Battle/BattleCreateSecond';
import BattleList from '../screens/Battle/BattleList';
import BattleMain from '../screens/Battle/BattleMain';
import BattleOpponentDiet from '../screens/Battle/BattleOpponentDiet';
import BattleOtherState from '../screens/Battle/BattleOtherState';
import BattleParticipate from '../screens/Battle/BattleParticipate';
import BattleResult from '../screens/Battle/BattleResult';
import DietDetail from '../screens/Record/Diet/DietDetail';
import DietEnroll from '../screens/Record/Diet/DietEnroll';
import DietMain from '../screens/Record/Diet/DietMain';
import DietSearch from '../screens/Record/Diet/DietSearch';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="BodyMain" component={BodyMain} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Main" component={MainTabNavigator} />

      <Stack.Screen name="BattleCreate" component={BattleCreate} />
      <Stack.Screen name="BattleCreateSecond" component={BattleCreateSecond} />
      <Stack.Screen name="BattleList" component={BattleList} />
      <Stack.Screen name="BattleMain" component={BattleMain} />
      <Stack.Screen name="BattleOpponentDiet" component={BattleOpponentDiet} />
      <Stack.Screen name="BattleOtherState" component={BattleOtherState} />
      <Stack.Screen name="BattleParticipate" component={BattleParticipate} />
      <Stack.Screen name="BattleResult" component={BattleResult} />

      <Stack.Screen name="MateCreate" component={MateCreate} />
      <Stack.Screen name="MateList" component={MateList} />
      <Stack.Screen name="MyMate" component={MyMate} />

      <Stack.Screen name="DietDetail" component={DietDetail} />
      <Stack.Screen name="DietEnroll" component={DietEnroll} />
      <Stack.Screen name="DietMain" component={DietMain} />
      <Stack.Screen name="DietSearch" component={DietSearch} />
    </Stack.Navigator>
  );
};

export default AppNavigator;