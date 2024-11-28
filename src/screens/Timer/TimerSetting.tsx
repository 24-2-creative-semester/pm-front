import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TimerSetting = ({ navigation }: { navigation: any }) => {
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedSecond, setSelectedSecond] = useState('00');

  const hours = Array.from({ length: 100 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  const seconds = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  

  // 버튼 클릭 시 TimerRunningScreen으로 시간 데이터 전달 후 화면 전환
  const startTimer = () => {
    const totalSeconds =
      parseInt(selectedHour) * 3600 + parseInt(selectedMinute) * 60 + parseInt(selectedSecond);
  
    // 로그로 totalSeconds 값 출력
    console.log('Timer data:', { totalSeconds });
  
    // 타이머 데이터 전송 후 TimerRunning 화면으로 전환
    navigation.navigate('TimerRunning', { totalSeconds });
  };

  return (
    <View style={styles.container}>
      <View style={styles.timecontentContainer}>
        <Text style={styles.label}>시간</Text>
        <Text style={styles.label}>분</Text>
        <Text style={styles.label}>초</Text>
      </View>

      <View style={styles.timePickerContainer}>
        {/* 시간 선택 */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedHour}
            onValueChange={(itemValue) => setSelectedHour(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {hours.map((hour) => (
              <Picker.Item key={hour} label={hour} value={hour} />
            ))}
          </Picker>
        </View>

        {/* 분 선택 */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMinute}
            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {minutes.map((minute) => (
              <Picker.Item key={minute} label={minute} value={minute} />
            ))}
          </Picker>
        </View>

        {/* 초 선택 */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSecond}
            onValueChange={(itemValue) => setSelectedSecond(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {seconds.map((second) => (
              <Picker.Item key={second} label={second} value={second} />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity onPress={startTimer} style={styles.button}>
        <Text style={styles.buttonText}>시작</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timecontentContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 35,
    color: '#8c8c8c',
    marginBottom: 10,
    marginHorizontal: 35,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  picker: {
    width: 85,
    height: 60,
    fontSize: 150,
    color: '#ffffff',
  },
  pickerItem: {
    fontSize: 150,
    color: '#ffffff',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#635bff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default TimerSetting;
