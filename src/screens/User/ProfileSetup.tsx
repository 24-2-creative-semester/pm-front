import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../../styles/ProfileStyles";

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/types';

import { StackNavigationProp } from '@react-navigation/stack';


const ProfileSetup = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ProfileSetup'>>();

  const [selectedDiet, setSelectedDiet] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');

  const handleDietSelection = (dietType: string) => {
    setSelectedDiet(dietType);
  };

  const handleProfileImageSelection = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
    });

    if (result.didCancel) {
      Alert.alert('취소됨', '이미지 선택이 취소되었습니다.');
    } else if (result.errorMessage) {
      Alert.alert('오류', `이미지 선택 중 오류가 발생했습니다: ${result.errorMessage}`);
    } else if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        setProfileImage(uri);
      } else {
        Alert.alert('오류', '이미지 URI를 가져올 수 없습니다.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!name || !age || !height || !weight || !targetWeight || !selectedDiet) {
      Alert.alert('입력 오류', '모든 필드를 채워주세요.');
      return;
    }
  
    // JSON 데이터 생성
    const requestData = {
      name: name,
      memberAge: parseInt(age, 10),
      memberHeight: parseFloat(height),
      memberWeight: parseFloat(weight),
      memberTargetWeight: parseFloat(targetWeight),
      memberDietType: selectedDiet,
    };
  
    console.log("보낼 데이터:", requestData);
  
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      if (!accessToken) {
        Alert.alert('오류', '로그인 토큰을 찾을 수 없습니다. 다시 로그인 해주세요.');
        return;
      }
  
      // JSON 형식으로 데이터 전송
      const response = await fetch('http://192.168.45.176:8080/profileSetting', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // JSON 형식의 Content-Type
          Authorization: `${accessToken}`,    // 인증 토큰 추가
        },
        body: JSON.stringify(requestData),    // JSON 데이터를 문자열로 변환
      });
  
      const data = await response.json();
      console.log("서버 응답:", data);
  
      if (response.ok) {
        Alert.alert('성공', '프로필 등록이 완료되었습니다.', [
          {
            text: '확인',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Main', params: { screen: 'Home' } }],
            }),   
          },
        ]);
      } else {
        Alert.alert('오류', data.message || '등록 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
      Alert.alert('오류', '네트워크 문제로 요청을 완료할 수 없습니다.');
    }
  };
  


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>프로필 설정</Text>

      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={handleProfileImageSelection}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.defaultProfileImage}>
            <Text style={styles.defaultProfileText}>+</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={style.inputContainer}>
        <Text style={style.label}>이름</Text>
        <TextInput
          placeholder="이름을 입력하세요"
          placeholderTextColor="#aaa"
          style={[style.input, { color: "#fff" }]}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>나이 (만)</Text>
        <TextInput
          placeholder="만 나이를 입력하세요"
          placeholderTextColor="#aaa"
          style={[style.input, { color: "#fff" }]}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>키 (cm)</Text>
        <TextInput
          placeholder="키를 입력하세요"
          placeholderTextColor="#aaa"
          style={[style.input, { color: "#fff" }]}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>몸무게 (kg)</Text>
        <TextInput
          placeholder="몸무게를 입력하세요"
          placeholderTextColor="#aaa"
          style={[style.input, { color: "#fff" }]}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>목표 몸무게 (kg)</Text>
        <TextInput
          placeholder="목표 몸무게를 입력하세요"
          placeholderTextColor="#aaa"
          style={[style.input, { color: "#fff" }]}
          keyboardType="numeric"
          value={targetWeight}
          onChangeText={setTargetWeight}
        />
      </View>

      <Text style={styles.subTitle}>다이어트 유형</Text>

      <View style={styles.dietTypeContainer}>
        {[
          { type: 'DIET', label: '체중감량', icon: require('../../assets/images/weight-loss.png') },
          { type: 'BULK', label: '벌크업', icon: require('../../assets/images/bulk-up.png') },
          { type: 'carb-cycle', label: '탄수화물 사이클링', icon: require('../../assets/images/carb-cycle.png') },
          { type: 'keto', label: '키토제닉', icon: require('../../assets/images/keto.png') },
        ].map((diet) => (
          <TouchableOpacity
            key={diet.type}
            style={[
              styles.dietType,
              selectedDiet === diet.type && styles.selectedDietType,
            ]}
            onPress={() => handleDietSelection(diet.type)}
          >
            <Image
              source={diet.icon}
              style={[
                styles.icon,
                selectedDiet === diet.type && styles.selectedIcon,
              ]}
            />
            <Text
              style={[
                styles.iconText,
                selectedDiet === diet.type && styles.selectedIconText,
              ]}
            >
              {diet.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  defaultProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultProfileText: {
    fontSize: 36,
    color: '#fff',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6F6DFF',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 16,
  },
  subTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  dietTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  dietType: {
    width: '48%',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedDietType: {
    backgroundColor: '#6F6DFF',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: '#ccc', // 비선택 상태 아이콘 색상
  },
  selectedIcon: {
    tintColor: '#fff', // 선택 상태 아이콘 색상
  },
  iconText: {
    color: '#ccc',
  },
  selectedIconText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#6F6DFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfileSetup;