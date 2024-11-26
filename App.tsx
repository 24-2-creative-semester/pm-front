import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './src/navigations/MainTabNavigator';
import AppNavigator from './src/navigations/AppNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

const App = () => {
  // 인증 상태를 관리하는 state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {/* 인증 상태에 따라 AppNavigator 또는 MainTabNavigator를 표시 */}
      {isAuthenticated ? <MainTabNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default App;
