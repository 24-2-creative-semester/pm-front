import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../../navigations/types';
import { StackNavigationProp } from '@react-navigation/stack';

type WeightAfterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WeightRevise'>;

const WeightAfter = () => {
  const navigation = useNavigation<WeightAfterScreenNavigationProp>();

  const [weightData, setWeightData] = useState({
    memberWeight: '',
    memberBodyfat: '',
    memberSkeletalmuscle: '',
    day: '',
    memberName:'',
  });

  // 서버로 데이터를 요청하는 함수
  const fetchWeightDetails = async () => {
    try {
      const response = await fetch('http://172.16.86.241:8080/dayweight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          today: '2024-11-07',  // 원하는 날짜 (today)
          memberId: 1,  // 예시로 memberId 1 사용
        }),
      });

      const data = await response.json();

      // 서버 응답 처리
      if (data.isSuccess) {
        setWeightData({
          memberWeight: data.result.memberWeight,
          memberBodyfat: data.result.memberBodyfat,
          memberSkeletalmuscle: data.result.memberSkeletalmuscle,
          day: data.result.day,
          memberName:data.result.memberName,
        });
      } else {
        Alert.alert('실패', '체중 데이터를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('오류', '서버와의 연결에 실패했습니다.');
    }
  };

  // 컴포넌트가 렌더링될 때 서버에서 데이터를 받아오기 위한 useEffect
  useEffect(() => {
    fetchWeightDetails();
  }, []); // 빈 배열을 넣어 한번만 실행되도록

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="chevron-back-outline" size={26} color="white" style={styles.backIcon} />
        <Text style={styles.dateText}>{weightData.day}</Text>
        <Icon name="ellipsis-horizontal" size={26} color="white" style={styles.menuIcon} />
      </View>

      <View style={styles.tabContainer}>
        <Text style={styles.tabText}>식단</Text>
        <Text style={styles.tabText}>운동</Text>
        <Text style={styles.tabText}>눈바디</Text>
        <Text style={[styles.tabText, styles.activeTab]}>체중</Text>
      </View>

      <View style={styles.weightCard}>
        <Text style={styles.cardHeader}>{weightData.memberName}님의 오늘 몸무게</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('WeightRevise')} // 수정된 부분
        >
          <Text style={styles.editButtonText}>수정</Text>
        </TouchableOpacity>
        <Text style={styles.weightText}>{weightData.memberWeight}kg</Text>
      </View>

      <View style={styles.detailCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>골격근량</Text>
          <Text style={styles.detailValue}>{weightData.memberSkeletalmuscle}kg</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>체지방량</Text>
          <Text style={styles.detailValue}>{weightData.memberBodyfat}kg</Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Icon name="document-text-outline" size={30} color="white" />
        <Icon name="trophy-outline" size={30} color="white" />
        <Icon name="home-outline" size={30} color="white" />
        <Icon name="stopwatch-outline" size={30} color="white" />
        <Icon name="people-outline" size={30} color="white" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
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
    marginBottom: 20,
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
  weightCard: {
    backgroundColor: '#7c77ff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  cardHeader: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#6a67d8',
    borderRadius: 10,
    padding: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
  },
  weightText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  detailCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailLabel: {
    color: 'white',
    fontSize: 16,
  },
  detailValue: {
    color: '#7c77ff',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 20,
  },
});

export default WeightAfter;
