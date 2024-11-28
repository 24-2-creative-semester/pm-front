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
import ExerciseMain from '../screens/Record/Exercise/ExerciseMain';
import ExerciseSearch from '../screens/Record/Exercise/ExerciseSearch';
import ExerciseDetail from '../screens/Record/Exercise/ExerciseDetail';
import ExerciseEnroll from '../screens/Record/Exercise/ExerciseEnroll';
import BodySpecific from '../screens/Record/Body/BodySpecific';
import BodyToday from '../screens/Record/Body/BodyToday';
import SeeAllBody from '../screens/Record/Body/SeeAllBody';

const Stack = createStackNavigator();

export type RecordStackParamList = {
  DietMain: {date:string};
  ExerciseMain: undefined;
  BodyMain: undefined;
  WeightMain: undefined;
  BodyToday:undefined;
  Calandar:undefined;
};

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

      <Stack.Screen name="Calendar" component={WeightCalendarScreen} />

      <Stack.Screen name="ExerciseMain" component={ExerciseMain} />
      <Stack.Screen name="ExerciseSearch" component={ExerciseSearch} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
      <Stack.Screen name="ExerciseEnroll" component={ExerciseEnroll} />

      <Stack.Screen name="BodySpecific" component={BodySpecific} />
      <Stack.Screen name="BodyToday" component={BodyToday} />
      <Stack.Screen name="SeeAllBody" component={SeeAllBody} />
    </Stack.Navigator>
  );
};

export default RecordStackNavigator;
