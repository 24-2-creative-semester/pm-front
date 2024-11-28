import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileSetup: undefined;

  ExerciseMain: undefined;
  ExerciseSearch: undefined;
  ExerciseDetail: undefined;
  ExerciseEnroll: undefined;

  BodyMain: undefined;
  MateCreate: undefined;
  MyMate: undefined;
  Home: undefined;
  Main:undefined; // MainTabNavigator 타입 정의 가능
  Record: undefined; // Record 추가
  Battle: undefined; // Battle도 추가 필요
  Timer: undefined; // Timer 추가
  MateList: undefined; // Mate 추가
  DietMain : undefined;
  DietDetail: {
    foodid: number;
    mealtime: string;
  };
  DietEnroll: { mealtime: string };
  DietSearch: { mealtime: string };


  BattleCreate :undefined;
  BattleCreateSecond: { inviteCode: string };
  BattleList:undefined;
  BattleMain:undefined;
  BattleOpponentDiet:undefined;
  BattleOtherState: { battleId: string }; // battleId 전달 정의
  BattleResult: { battleId: string; memberId: string }; // battleId와 memberId 정의
  inviteCode:undefined;
  BattleParticipate: undefined;
  
  WeightAfter: { date: string };
  WeightBefore: { date: string };
  WeightRevise: { date: string };

  WeightCalendarScreen:undefined;

  SeeAllBody :undefined;
  BodyToday:undefined;

  TimerRunning: { totalSeconds: number };
  TimerSetting: undefined;

  DateNavigator:undefined;
};
