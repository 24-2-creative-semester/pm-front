import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const RecordTabSelector: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute(); // 현재 활성화된 Route 가져오기

  // 탭 정보 정의
  const tabs = [
    { name: "식단", route: "DietMain" as keyof RootStackParamList },
    { name: "운동", route: "ExerciseMain" as keyof RootStackParamList },
    { name: "눈바디", route: "BodyMain" as keyof RootStackParamList },
    { name: "체중", route: "WeightBefore" as keyof RootStackParamList },
  ];

  // 한국 시간 기준으로 날짜 가져오기
  const getKoreanDate = () => {
    const now = new Date();
    now.setHours(now.getHours() + 9); // UTC+9 적용
    return now.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식 반환
  };

  const currentDate = getKoreanDate();

  const handleNavigate = async (tabRoute: keyof RootStackParamList) => {
    if (tabRoute === "BodyMain") {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        console.log("Current Date (Korean):", currentDate);

        const response = await fetch(
          `/api/isImageDate?date=${currentDate}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `${accessToken}`,
            },
          }
        );

        const data = await response.json();
        console.log("Response Data:", data);

        if (response.ok && data.isSuccess) {
          navigation.navigate(data.result ? "BodyToday" : "BodyMain");
        } else {
          Alert.alert("오류", data.message || "데이터 확인 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        Alert.alert("오류", "데이터 확인 중 문제가 발생했습니다.");
      }
    } else if (tabRoute === "WeightBefore") {
      // 체중 확인 요청
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        console.log("Checking weight for date:", currentDate);

        const response = await fetch(
          `/checkweight?today=${currentDate}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `${accessToken}`,
            },
          }
        );

        const data = await response.json();
        console.log("Response Data:", data);

        if (response.ok && data.isSuccess) {
          // true: 체중 등록됨 -> WeightAfter로 이동
          // false: 체중 미등록 -> WeightBefore로 이동
          navigation.navigate(data.result ? "WeightAfter" : "WeightBefore", {
            date: currentDate,
          });
        } else {
          Alert.alert("오류", data.message || "체중 데이터 확인 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("체중 확인 API 호출 오류:", error);
        Alert.alert("오류", "체중 데이터 확인 중 문제가 발생했습니다.");
      }
    } else {
      navigation.navigate(tabRoute);
    }
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.route}
          onPress={() => handleNavigate(tab.route)} // 클릭 시 handleNavigate 호출
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              (route.name === tab.route || (route.name === "BodyToday" && tab.route === "BodyMain")) &&
                styles.activeTabText, // BodyToday와 BodyMain 동기화
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    color: "#1D1B20",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#FFF",
  },
  activeTabText: {
    color: "#6F6CFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RecordTabSelector;
