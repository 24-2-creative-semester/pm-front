import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import RecordStackNavigator from './RecordStackNavigator';
import BattleStackNavigator from './BattleStackNavigator';
import MateStackNavigator from './MateStackNavigator';
import TimerStackNavigator from './TimerStackNavigator';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          position: 'absolute',
          height: 60,
          borderTopWidth:0,
        },
      }}
    >
      <Tab.Screen
        name="Record"
        component={RecordStackNavigator}
        options={{
          tabBarLabel: '', // 영어 텍스트 제거
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={require('../assets/images/record.png')}
              label="기록"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Battle"
        component={BattleStackNavigator}
        options={{
          tabBarLabel: '', // 영어 텍스트 제거
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={require('../assets/images/vs.png')}
              label="대결"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '', // 영어 텍스트 제거
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={require('../assets/images/home.png')}
              label="홈"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Timer"
        component={TimerStackNavigator}
        options={{
          tabBarLabel: '', // 영어 텍스트 제거
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={require('../assets/images/timer.png')}
              label="타이머"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mate"
        component={MateStackNavigator}
        options={{
          tabBarLabel: '', // 영어 텍스트 제거
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={require('../assets/images/mate.png')}
              label="운동메이트"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
