import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ProfileSetup from '../screens/User/ProfileSetup';
import ExerciseMain from '../screens/Record/Exercise/ExerciseMain';
import ExerciseSearch from '../screens/Record/Exercise/ExerciseSearch';
import ExerciseDetail from '../screens/Record/Exercise/ExerciseDetail';
import ExerciseEnroll from '../screens/Record/Exercise/ExerciseEnroll';
import BodyMain from '../screens/Record/Body/BodyMain';
import MateCreate from '../screens/Mate/MateCreate';
import MyMate from '../screens/Mate/MyMate';
import Home from '../screens/Home';
import MainTabNavigator from './MainTabNavigator';
import MateList from '../screens/Mate/MateList';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="ExerciseMain" component={ExerciseMain} />
      <Stack.Screen name="ExerciseSearch" component={ExerciseSearch} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
      <Stack.Screen name="ExerciseEnroll" component={ExerciseEnroll} />
      <Stack.Screen name="BodyMain" component={BodyMain} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import Splash from '../screens/Splash';
// import Login from '../screens/Login';
// import Signup from '../screens/Signup';
// import ProfileSetup from '../screens/User/ProfileSetup';
// import MainTabNavigator from './MainTabNavigator';
// import MateCreate from '../screens/Mate/MateCreate';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Splash" component={Splash} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Signup" component={Signup} />
//       <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
//       <Stack.Screen name="MateCreate" component={MateCreate} />
//       {/* MainTabNavigator로 연결 */}
//       <Stack.Screen name="Main" component={MainTabNavigator} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;

