import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/types';
import { format } from 'date-fns';

type BattleCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BattleCreateSecond'>;

function BattleCreate() {
  const [targetDuration, setTargetDuration] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const navigation = useNavigation<BattleCreateScreenNavigationProp>();

  const isButtonDisabled = targetDuration === '' || targetWeight === '';

  // 입력값 검증 함수
  const validateInputs = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isDateValid = dateRegex.test(targetDuration);
    const isWeightValid = !isNaN(Number(targetWeight)) && Number(targetWeight) > 0;

    if (!isDateValid) {
      Alert.alert('오류', '목표 기간은 YYYY-MM-DD 형식이어야 합니다.');
      return false;
    }

    if (!isWeightValid) {
      Alert.alert('오류', '목표 몸무게는 양수여야 합니다.');
      return false;
    }

    return true;
  };

  // 서버로 데이터 전송 함수
  const sendDataToServer = async () => {
    if (!validateInputs()) return; // 입력값 검증 실패 시 실행 중단

    try {
      const data = {
        member1Id: 1, // 실제 ID 값을 설정하세요.
        member1TargetWeight: parseFloat(targetWeight),
        targetDay: format(targetDuration,'yyyy-MM-dd') // "YYYY-MM-DD" 형식으로 날짜를 설정
      };

      const response = await fetch('http://192.168.45.176:8080/createbattle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log("Response:", response);
      console.log("Data:", data);
      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.ok&&responseData.isSuccess) {``
        // 성공적으로 전송된 경우 화면 이동
       // console.log("Response:", inviteCode);
        navigation.navigate('BattleCreateSecond', { inviteCode: responseData.result }); // 서버에서 초대 코드를 받아 전달
        Alert.alert('성공', '대결이 성공적으로 생성되었습니다.');
      } else {
        Alert.alert('오류', responseData.message || '데이터 전송에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('성공', '대결이 성공적으로 생성되었습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.row3}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<Text style={styles.backButtonText}>←</Text>
					</TouchableOpacity>
					<Text style={styles.text20}>{"대결 생성"}</Text>
				</View>

      {/* 단계 표시 */}
      <View style={styles.steps}>
        <View style={[styles.circle, { backgroundColor: '#6F6DFF' }]}><Text style={styles.stepText}>1</Text></View>
        <View style={styles.line} />
        <View style={[styles.circle, { backgroundColor: '#3a3a3a' }]}><Text style={styles.stepText}>2</Text></View>
      </View>

      {/* 목표 기간 입력 필드 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>목표 기간</Text>
        <TextInput
          style={styles.input}
          placeholder="2024-07-08"
          placeholderTextColor="#555"
          value={targetDuration}
          onChangeText={setTargetDuration}
        />
        <Text style={styles.label}>목표 몸무게</Text>
        <TextInput
          style={styles.input}
          placeholder="몸무게 입력"
          placeholderTextColor="#555"
          value={targetWeight}
          onChangeText={setTargetWeight}
          keyboardType="numeric"
        />
      </View>

      {/* 설정하기 버튼 */}
      <TouchableOpacity
        style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
        disabled={isButtonDisabled}
        onPress={sendDataToServer}
      >
        <Text style={styles.buttonText}>설정하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BattleCreate;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
  },
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: 'white',
    fontSize: 12,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: '#3a3a3a',
    marginHorizontal: 5,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#3a3a3a',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
    button: {
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonDisabled: {
      backgroundColor: '#4a4a4a',
    },
    buttonEnabled: {
      backgroundColor: '#7c77ff',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
    },
    backButton: {
      position: "absolute",
      top:15,
      left: -5,
      zIndex: 1,
      },
      backButtonText: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "bold",
      },
      row3: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between", // 백버튼과 텍스트를 양 끝으로 배치
      position: "relative", // 위치 조정을 위해 relative 사용
      paddingHorizontal: 10,
      paddingVertical: 15,
      paddingBottom:100
    },
    text20: {
      flex: 1, // 텍스트가 가운데 배치될 수 있도록 flex 설정
      textAlign: "center", // 텍스트를 중앙 정렬
      fontSize: 18,
      color: "#FFF",
      fontWeight: "bold",
    },
});
