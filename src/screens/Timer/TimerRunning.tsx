import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const TimerRunningScreen = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const toggleTimer = () => {
    console.log(isActive ? '타이머 중지' : '타이머 시작');
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    console.log("타이머 리셋됨");
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = () => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Svg height="350" width="350">
        <Circle
          cx="175"
          cy="175"
          r="160"
          stroke="#a4facb"
          strokeWidth="10"
          fill="none"
        />
        <Circle
          cx="175"
          cy="175"
          r="160"
          stroke="#7c77ff"
          strokeWidth="10"
          strokeDasharray="1000"
          strokeDashoffset={isActive ? 1000 - (seconds % 60) * (1000 / 60) : 1000}
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

export default TimerRunningScreen;
