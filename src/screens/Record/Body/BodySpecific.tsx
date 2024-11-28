import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BodySpecific: React.FC<{ route: any }> = ({ route }) => {
  const { imageId, date } = route.params; // 전달된 imageId와 date를 수신
  const [imageBase64, setImageBase64] = useState<string | null>(null);

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
        `http://172.16.86.241:8080/api/getImage?id=${imageId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json", // JSON 형식의 응답을 수락
            Authorization: `${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json(); // JSON으로 파싱
        console.log("API 응답 데이터:", data);

        if (data.isSuccess && data.result) {
          setImageBase64(data.result); // `result`에서 Base64 이미지 데이터를 가져와 저장
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

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}의 눈바디 사진</Text>
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
  date: {
    color: "#FFFFFF",
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
