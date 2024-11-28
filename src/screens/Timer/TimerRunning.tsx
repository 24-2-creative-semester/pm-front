// 
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigations/types";

type TimerRunningRouteProp = RouteProp<RootStackParamList, 'TimerRunning'>;
type TimerRunningNavigationProp = StackNavigationProp<RootStackParamList, 'TimerRunning'>;

type Props = {
  route: TimerRunningRouteProp;
  navigation: TimerRunningNavigationProp;
};

const TimerRunning = ({ route, navigation }: Props) => {
  const { totalSeconds } = route.params ?? { totalSeconds: 0 };

  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev: number) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsRemaining]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsRemaining(totalSeconds); // 초기값으로 리셋
  };

  const formatTime = () => {
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // 시간 경과에 따라 색상 변화
  const getStrokeColor = () => {
    const progress = secondsRemaining / totalSeconds;
    const red = Math.min(255, Math.floor(255 * (1 - progress)));
    const green = Math.min(255, Math.floor(255 * progress));
    return `rgb(${red}, ${green}, 255)`; // 파란색에서 빨간색으로 변화
  };

  // 원의 진행도에 따른 offset 계산
  const radius = 160;
  const circumference = 2 * Math.PI * radius; // 원의 둘레
  const strokeDashoffset = circumference - (secondsRemaining / totalSeconds) * circumference;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Svg height="350" width="350">
        {/* 배경 원 */}
        <Circle
          cx="175"
          cy="175"
          r={radius}
          stroke="#1a1a1a"
          strokeWidth="10"
          fill="none"
        />
        {/* 진행되는 원 */}
        <Circle
          cx="175"
          cy="175"
          r={radius}
          stroke={getStrokeColor()} // 시간에 따라 색상 변화
          strokeWidth="10"
          strokeDasharray={circumference} // 원의 둘레를 기준으로 진행 상태 계산
          strokeDashoffset={strokeDashoffset} // 진행 상태에 따라 원 축소
          fill="none"
          transform="rotate(-90 175 175)" // 회전 적용
        />
      </Svg>

      <Text style={styles.timeText}>{formatTime()}</Text>
      <TouchableOpacity onPress={isActive ? resetTimer : toggleTimer} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? '취소' : '시작'}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }], // 중앙으로 이동
    fontSize: 40,
    color: '#ffffff',
  },
  button: {
    marginTop: 50,
    backgroundColor: '#7c77ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5, // Android의 그림자 효과
    shadowColor: '#000', // iOS의 그림자 효과
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default TimerRunning;
