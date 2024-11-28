import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RecordTabSelector from "../../../components/RecordTabSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BodyToday: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [todayImageBase64, setTodayImageBase64] = useState<string | null>(null);

  useEffect(() => {
    fetchTodayImage();
  }, []);

  const fetchTodayImage = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (!accessToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      // 현재 날짜에 9시간 추가해 한국 시간으로 변환
      const now = new Date();
      const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // 9시간 추가
      const today = koreaTime.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식

      const response = await fetch(
        `http://172.16.86.241:8080/api/getImageListDate?date=${today}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        if (data.result) {
          // Base64 문자열에 접두사가 없는 경우 추가
          const base64String = data.result.startsWith("data:image")
            ? data.result
            : `data:image/jpeg;base64,${data.result}`;

          setTodayImageBase64(base64String);
        } else {
          Alert.alert("오류", "오늘의 눈바디 이미지가 없습니다.");
          setTodayImageBase64(null);
        }
      } else {
        Alert.alert("오류", data.message || "오늘의 눈바디를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("오늘의 눈바디 이미지 불러오기 실패:", error);
      Alert.alert("오류", "이미지를 불러오는 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <RecordTabSelector />
      <Text style={styles.title}>오늘의 눈바디</Text>
      {todayImageBase64 ? (
        <Image
          source={{ uri: todayImageBase64 }} // Base64 데이터를 Image에 전달
          style={styles.image}
        />
      ) : (
        <Text style={styles.noImageText}>오늘의 눈바디가 없습니다.</Text>
      )}

      {/* 하단 우측 원형 버튼 */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("SeeAllBody")}
      >
        <Icon name="grid-outline" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    marginTop: 90,
    marginBottom: 20,
  },
  image: {
    width: "80%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  noImageText: {
    color: "#625F67",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6F6CFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // 안드로이드 그림자
    shadowColor: "#000", // iOS 그림자
    shadowOffset: { width: 0, height: 2 }, // iOS 그림자 오프셋
    shadowOpacity: 0.3, // iOS 그림자 투명도
    shadowRadius: 3, // iOS 그림자 반경
  },
});

export default BodyToday;
