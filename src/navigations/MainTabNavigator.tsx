import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BattleMain from '../screens/Battle/BattleMain';
import MateList from '../screens/Mate/MateList';
import DietMain from '../screens/Record/Diet/DietMain';
import TimerSetting from '../screens/Timer/TimerSetting';
import Home from '../screens/Home';
import TabBarIcon from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          position: 'absolute', // 고정
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Record"
        component={DietMain}
        options={{
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
        component={BattleMain}
        options={{
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
        component={TimerSetting}
        options={{
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
        component={MateList}
        options={{
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
