import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BodySpecific: React.FC<{ route: any }> = ({ route }) => {
  const { imageId } = route.params; // 전달된 imageId를 수신
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageDate, setImageDate] = useState<string | null>(null); // 이미지의 날짜 상태 추가
  const navigation = useNavigation();

  useEffect(() => {
    fetchImage(); // 컴포넌트 로드 시 이미지 가져오기
  }, []);

  const fetchImage = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      console.log("요청된 imageId:", imageId);

      const response = await fetch(
        `http://192.168.45.176:8080/api/getImage?id=${imageId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json", // JSON 형식의 응답을 수락
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json(); // JSON으로 파싱
        console.log("API 응답 데이터:", data);

        if (data.isSuccess && data.result) {
          // ImageDto 구조의 데이터를 분리
          const { base64, localDate } = data.result;
          setImageBase64(base64); // Base64 이미지 데이터 저장
          setImageDate(localDate); // 날짜 데이터 저장
        } else {
          console.error("API 응답 데이터 오류:", data.message);
          Alert.alert("오류", "이미지를 불러오지 못했습니다.");
        }
      } else {
        const errorText = await response.text();
        console.error("API 응답 오류:", errorText);
        Alert.alert("오류", "이미지를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("이미지 가져오기 실패:", error);
      Alert.alert("오류", "이미지를 불러오는 중 문제가 발생했습니다.");
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; // "YYYY년 MM월 DD일" 형식으로 반환
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      {imageDate ? (
        <Text style={styles.date}>{formatDate(imageDate)}의 눈바디 사진</Text>
      ) : (
        <Text style={styles.date}>날짜 정보를 불러오는 중입니다...</Text>
      )}
      {imageBase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }} // Base64 데이터를 이미지로 표시
          style={styles.image}
        />
      ) : (
        <Text style={styles.placeholder}>이미지를 불러오는 중입니다...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: "#FFFFFF",
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  placeholder: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default BodySpecific;
