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
        },
      }}
    >
      <Tab.Screen
        name="Record"
        component={RecordStackNavigator}
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
        component={BattleStackNavigator}
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
        component={TimerStackNavigator}
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
        component={MateStackNavigator}
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



// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import BattleMain from '../screens/Battle/BattleMain';
// import DietMain from '../screens/Record/Diet/DietMain';
// import TimerSetting from '../screens/Timer/TimerSetting';
// import Home from '../screens/Home';
// import MateList from '../screens/Mate/MateList';
// import MateCreate from '../screens/Mate/MateCreate';
// import MyMate from '../screens/Mate/MyMate';
// import TabBarIcon from '../components/TabBarIcon';

// const Tab = createBottomTabNavigator();
// const MateStack = createStackNavigator();

// const MateStackNavigator = () => {
//   return (
//     <MateStack.Navigator screenOptions={{ headerShown: false }}>
//       <MateStack.Screen name="MateList" component={MateList} />
//       <MateStack.Screen name="MateCreate" component={MateCreate} />
//       <MateStack.Screen name="MyMate" component={MyMate} />
//     </MateStack.Navigator>
//   );
// };

// const MainTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#1A1A1A',
//           position: 'absolute',
//           height: 60,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Record"
//         component={DietMain}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon
//               focused={focused}
//               icon={require('../assets/images/record.png')}
//               label="기록"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Battle"
//         component={BattleMain}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon
//               focused={focused}
//               icon={require('../assets/images/vs.png')}
//               label="대결"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon
//               focused={focused}
//               icon={require('../assets/images/home.png')}
//               label="홈"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Timer"
//         component={TimerSetting}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon
//               focused={focused}
//               icon={require('../assets/images/timer.png')}
//               label="타이머"
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Mate"
//         component={MateStackNavigator}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon
//               focused={focused}
//               icon={require('../assets/images/mate.png')}
//               label="운동메이트"
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default MainTabNavigator;
