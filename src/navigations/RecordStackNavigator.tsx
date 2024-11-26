import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DietMain from '../screens/Record/Diet/DietMain';
import DietDetail from '../screens/Record/Diet/DietDetail';
import DietEnroll from '../screens/Record/Diet/DietEnroll';
import DietSearch from '../screens/Record/Diet/DietSearch';
import BodyMain from '../screens/Record/Body/BodyMain';
import WeightBefore from '../screens/Record/Weight/WeightBefore';
import WeightAfter from '../screens/Record/Weight/WeightAfter';
import WeightRevise from '../screens/Record/Weight/WeightRevise';
import WeightCalendarScreen from '../screens/Record/Calendar';

const Stack = createStackNavigator();

const RecordStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DietMain" component={DietMain} />
      <Stack.Screen name="DietDetail" component={DietDetail} />
      <Stack.Screen name="DietEnroll" component={DietEnroll} />
      <Stack.Screen name="DietSearch" component={DietSearch} />
      <Stack.Screen name="BodyMain" component={BodyMain} />

      <Stack.Screen name="WeightAfter" component={WeightAfter} />
      <Stack.Screen name="WeightBefore" component={WeightBefore} />
      <Stack.Screen name="WeightRevise" component={WeightRevise} />

      <Stack.Screen name="WeightCalendarScreen" component={WeightCalendarScreen} />
    </Stack.Navigator>
  );
};

export default RecordStackNavigator;
