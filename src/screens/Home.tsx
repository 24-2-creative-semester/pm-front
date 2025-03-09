import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Home: React.FC = () => {
  const [targetCalories, setTargetCalories] = useState<number[]>([0, 0, 0]);
  const [nowCalories, setNowCalories] = useState<number[]>([0, 0, 0]);
  const [userName, setUserName] = useState<string>("사용자");
  const [dietType, setDietType] = useState<string>("다이어트");

  const fetchSimpleInfo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch("/simpleInfo", {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setUserName(data.result.userName || "사용자");
        setDietType(data.result.dietType || "다이어트");
      } else {
        Alert.alert("오류", "사용자 정보를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  const fetchTargetCalories = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "/food/targetCalories",
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setTargetCalories(data.result || [0, 0, 0]);
      } else {
        Alert.alert("오류", "목표 칼로리를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("목표 칼로리 불러오기 실패:", error);
    }
  };

  const fetchEatingByDate = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      const now = new Date();
      const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
      const today = koreaTime.toISOString().split("T")[0];

      const response = await fetch(
        `/food/eatingByDate?date=${today}`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setNowCalories(data.result.nowCalories || [0, 0, 0]);
      } else {
        // console.error("오늘 먹은 양 불러오기 실패:", data.message);
      }
    } catch (error) {
      // console.error("오늘 먹은 양 불러오기 실패:", error);
    }
  };

  // useFocusEffect를 사용해 화면 포커스 시 데이터 갱신
  useFocusEffect(
    useCallback(() => {
      fetchSimpleInfo();
      fetchTargetCalories();
      fetchEatingByDate();
    }, [])
  );

  const totalTargetCalories = targetCalories.reduce((sum, val) => sum + val, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.greetingText}>
          <Text style={styles.nameText}>{userName}님은{"\n"}</Text>
          <Text style={styles.highlightText}>{dietType} 다이어트</Text>
          <Text> 중이에요!</Text>
        </Text>

        <Text style={styles.sectionTitle}>오늘의 목표 달성률</Text>

        <View style={styles.labelsContainer}>
          {["탄수화물", "단백질", "지방"].map((label, index) => (
            <View key={index} style={styles.label}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === 0 ? "#6F6CFF" : index === 1 ? "#D6FF0A" : "#69FFD7",
                  },
                ]}
              />
              <Text style={styles.labelText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.horizontalProgressContainer}>
          {targetCalories.map((target, index) => (
            <View key={index} style={styles.progressBarWrapper}>
              <View style={styles.progressBar}>
                <View
                  style={{
                    width: `${(nowCalories[index] / target) * 100}%`,
                    backgroundColor:
                      index === 0 ? "#6F6CFF" : index === 1 ? "#D6FF0A" : "#69FFD7",
                    height: "100%",
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.progressLabels}>
          {nowCalories.map((value, index) => (
            <Text key={index} style={styles.percentText}>
              {Math.round((value / targetCalories[index]) * 100) || 0}%
            </Text>
          ))}
        </View>

        <View style={[styles.card, styles.eatenCard]}>
          <Text style={[styles.cardTitle ,{ color: "#FFF" }]}>오늘 먹은 양</Text>
          <Text style={[styles.cardKcal ,{ color: "#FFF" }]}>
            {nowCalories.reduce((sum, val) => sum + val, 0)}kcal
          </Text>
          {["탄수화물", "단백질", "지방"].map((label, index) => (
            <Text key={index} style={styles.cardDetail}>
              {label}: {nowCalories[index]}kcal
            </Text>
          ))}
        </View>

        <View style={[styles.card, styles.remainingCard]}>
          <Text style={[styles.cardTitle, { color: "#6F6CFF" }]}>오늘 남은 양</Text>
          <Text style={[styles.cardKcal, { color: "#6F6CFF" }]}>
            {targetCalories.reduce((sum, val) => sum + val, 0) -
              nowCalories.reduce((sum, val) => sum + val, 0)}
            kcal
          </Text>
          {["탄수화물", "단백질", "지방"].map((label, index) => (
            <Text key={index} style={styles.cardDetail2}>
              {label}: {targetCalories[index] - nowCalories[index]}kcal
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding:10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  greetingText: {
    marginTop: 60,
    fontSize: 22,
    color: "#FFF",
    lineHeight: 30,
  },
  nameText: {
    fontWeight: "bold",
  },
  highlightText: {
    color: "#6F6CFF",
    textDecorationLine: "underline",
  },
  sectionTitle: {
    marginTop: 30,
    fontSize: 18,
    color: "#FFF",
  },
  labelsContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight:30,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 7,
  },
  labelText: {
    color: "#FFF",
    fontSize: 14,
  },
  horizontalProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  progressBarWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percentText: {
    fontSize: 12,
    color: "#BABABA",
    marginBottom:30,
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  eatenCard: {
    backgroundColor: "#6F6CFF",
  },
  remainingCard: {
    marginTop:30,
    backgroundColor: "#FFF",
  },
  cardTitle: {
    fontSize: 22,

    fontWeight: "bold",
  },
  cardKcal: {
    fontSize: 22,
    marginVertical: 10,
  },
  cardDetail: {
    fontSize: 14,
    color: "#FFF",
  },
  cardDetail2: {
    fontSize: 14,
    color: "#6F6CFF",
  },
});

export default Home;
