import React from 'react';
import { StyleSheet } from 'react-native';
import MainTabNavigator from '../navigations/MainTabNavigator';

const Home = () => {
  return <MainTabNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});

export default Home;
