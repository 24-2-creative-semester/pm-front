import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../../navigations/types";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderLayout from "../../../components/HeaderLayout";

type WeightAfterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "WeightRevise"
>;

const WeightDetailScreen = ({ route }: any) => {
  const navigation = useNavigation<WeightAfterScreenNavigationProp>();
  const initialDate =
    route.params?.date || new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [weightData, setWeightData] = useState({
    memberWeight: "",
    memberBodyfat: "",
    memberSkeletalmuscle: "",
    day: "",
    memberName: "",
  });

  // 서버로 데이터를 요청하는 함수
  const fetchWeightDetails = async (date: string) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("Fetching data for date:", date);
    try {
      const response = await fetch(
        `http://172.16.86.241:8080/dayweight?today=${date}`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      const data = await response.json();

      // 서버 응답 처리
      if (data.isSuccess) {
        setWeightData({
          memberWeight: data.result.memberWeight,
          memberBodyfat: data.result.memberBodyfat,
          memberSkeletalmuscle: data.result.memberSkeletalmuscle,
          day: data.result.day,
          memberName: data.result.memberName,
        });
      } else {
        navigation.navigate("WeightBefore", { date });
        // Alert.alert('실패', '체중 데이터를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("오류", "서버와의 연결에 실패했습니다.");
    }
  };

  // 날짜가 변경될 때 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchWeightDetails(selectedDate);
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HeaderLayout 적용 */}
      <HeaderLayout
        selectedDate={selectedDate}
        onDateChange={(date) => setSelectedDate(date)} // 날짜 변경 시 상태 업데이트
      >
        <View style={styles.weightCard}>
          <Text style={styles.cardHeader}>
            {weightData.memberName}님의 오늘 몸무게
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("WeightRevise", { date: selectedDate })
            } // 수정 화면으로 이동 시 선택된 날짜 전달
          >
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
          <Text style={styles.weightText}>{weightData.memberWeight}kg</Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>골격근량</Text>
            <Text style={styles.detailValue}>
              {weightData.memberSkeletalmuscle}kg
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>체지방량</Text>
            <Text style={styles.detailValue}>{weightData.memberBodyfat}kg</Text>
          </View>
        </View>
      </HeaderLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
  },
  weightCard: {
    backgroundColor: "#7c77ff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    position: "relative",
  },
  cardHeader: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#6a67d8",
    borderRadius: 10,
    padding: 5,
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
  },
  weightText: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  detailCard: {
    backgroundColor: "#2a2a2a",
    borderRadius: 15,
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  detailLabel: {
    color: "white",
    fontSize: 16,
  },
  detailValue: {
    color: "#7c77ff",
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    marginTop: 20,
  },
});

export default WeightDetailScreen;
