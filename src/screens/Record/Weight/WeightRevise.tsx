import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../../navigations/types';

const WeightRevise = () => {
  const [memberWeight, setMemberWeight] = useState('');
  const [skeletalmuscle, setSkeletalmuscle] = useState('');
  const [bodyfat, setBodyfat] = useState('');

  const isButtonDisabled = memberWeight === '' || skeletalmuscle === '' || bodyfat === '';

  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://172.16.4.171:8080/createweight', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberWeight: parseFloat(memberWeight),
          memberSkeletalmuscle: parseFloat(skeletalmuscle),
          memberBodyfat: parseFloat(bodyfat),
          today: new Date().toISOString().split('T')[0], // 오늘 날짜 (yyyy-mm-dd)
          memberId: 2, // 예시로 memberId 2 사용
        }),
      });

      const data = await response.json();

      // 서버 응답 처리
      if (data.isSuccess) {
        Alert.alert('성공', '체중이 성공적으로 등록되었습니다.');
      } else {
        Alert.alert('실패', '체중 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('오류', '서버와의 연결에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Icon name="chevron-back-outline" size={26} color="white" style={styles.backIcon} />
          <Text style={styles.dateText}>2024 09 14</Text>
          <Icon name="ellipsis-horizontal" size={26} color="white" style={styles.menuIcon} />
        </View>

        <View style={styles.tabContainer}>
          <Text style={styles.tabText}>식단</Text>
          <Text style={styles.tabText}>운동</Text>
          <Text style={styles.tabText}>눈바디</Text>
          <Text style={[styles.tabText, styles.activeTab]}>체중</Text>
        </View>

        <Text style={styles.messageText}>수정 값을 입력하세요</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>몸무게 (kg)</Text>
          <TextInput style={styles.input} 
          placeholder="몸무게 입력" 
          placeholderTextColor="#888" 
          keyboardType="numeric"
          value={memberWeight} 
          onChangeText={setMemberWeight}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>골격근량 (kg)</Text>
          <TextInput style={styles.input} 
          placeholder="골격근량 입력" 
          placeholderTextColor="#888" 
          keyboardType="numeric"
          value={skeletalmuscle}
          onChangeText={setSkeletalmuscle}/>
          
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>체지방량 (kg)</Text>
          <TextInput style={styles.input} 
          placeholder="체지방량 입력" 
          placeholderTextColor="#888" 
          keyboardType="numeric" 
          onChangeText={setBodyfat}/>
        </View>

        <TouchableOpacity
        style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
        disabled={isButtonDisabled}
        onPress={sendDataToServer} // 버튼 눌렀을 때 서버로 데이터 전송
      >
        <Text style={styles.buttonText}>등록</Text>
      </TouchableOpacity>

        <View style={styles.bottomNav}>
          <Icon name="document-text-outline" size={30} color="white" />
          <Icon name="trophy-outline" size={30} color="white" />
          <Icon name="home-outline" size={30} color="white" />
          <Icon name="stopwatch-outline" size={30} color="white" />
          <Icon name="people-outline" size={30} color="white" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    padding: 10,
  },
  dateText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  tabText: {
    color: 'gray',
    fontSize: 16,
  },
  activeTab: {
    color: '#7c77ff',
    borderBottomWidth: 2,
    borderBottomColor: '#7c77ff',
  },
  messageText: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  labelText: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  registerButton: {
    backgroundColor: '#7c77ff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
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
    color: '#ffffff',
    fontSize: 18,
  },
});

export default WeightRevise;
