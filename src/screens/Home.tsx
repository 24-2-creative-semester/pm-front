import React, { useEffect, useState } from "react";
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

const Home: React.FC = () => {
  const [targetCalories, setTargetCalories] = useState<number[]>([0, 0, 0]);
  const [nowCalories, setNowCalories] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    fetchTargetCalories();
    fetchEatingByDate();
  }, []);

  const fetchTargetCalories = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "http://172.16.86.241:8080/food/targetCalories",
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
        `http://172.16.86.241:8080/food/eatingByDate?date=${today}`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      const data = await response.json();
      console.log("eaten", data);

      if (response.ok && data.isSuccess) {
        setNowCalories(data.result.nowCalories || [0, 0, 0]);
      } else {
        // Alert.alert("오류", "오늘 먹은 양을 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("오늘 먹은 양 불러오기 실패:", error);
    }
  };

  const screenWidth = Dimensions.get("window").width - 40;
  const totalTargetCalories = targetCalories.reduce((sum, val) => sum + val, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.greetingText}>
          <Text style={styles.nameText}>김주원님은{"\n"}</Text>
          <Text style={styles.highlightText}>키토제닉 다이어트</Text>
          {" 중이에요!"}
        </Text>

        <Text style={styles.sectionTitle}>오늘의 목표 달성률</Text>

        {/* 레이블 추가 */}
        <View style={styles.labelsContainer}>
          <View style={styles.label}>
            <View style={[styles.dot, { backgroundColor: "#6F6CFF" }]} />
            <Text style={styles.labelText}>탄수화물</Text>
          </View>
          <View style={styles.label}>
            <View style={[styles.dot, { backgroundColor: "#D6FF0A" }]} />
            <Text style={styles.labelText}>단백질</Text>
          </View>
          <View style={styles.label}>
            <View style={[styles.dot, { backgroundColor: "#69FFD7" }]} />
            <Text style={styles.labelText}>지방</Text>
          </View>
        </View>

        <View style={styles.horizontalProgressContainer}>
          {targetCalories.map((target, index) => {
            const targetWidth = (screenWidth * target) / totalTargetCalories;

            return (
              <View
                key={index}
                style={[
                  styles.progressBarWrapper,
                  { width: `${(target / totalTargetCalories) * 100}%` },
                ]}
              >
                <View style={styles.progressBar}>
                  <View
                    style={{
                      width: `${(nowCalories[index] / target) * 100}%`,
                      backgroundColor:
                        index === 0
                          ? "#6F6CFF"
                          : index === 1
                          ? "#D6FF0A"
                          : "#69FFD7",
                      height: "100%",
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.progressLabels}>
          {nowCalories.map((value, index) => (
            <Text key={index} style={styles.percentText}>
              {Math.round((value / targetCalories[index]) * 100) || 0}%
            </Text>
          ))}
        </View>

        <View style={[styles.card, styles.eatenCard]}>
          <Text style={styles.cardTitle}>오늘 먹은 양</Text>
          <Text style={styles.cardKcal}>
            {nowCalories.reduce((sum, val) => sum + val, 0)}kcal
          </Text>
          <Text style={styles.cardDetail}>탄수화물: {nowCalories[0]}g</Text>
          <Text style={styles.cardDetail}>단백질: {nowCalories[1]}g</Text>
          <Text style={styles.cardDetail}>지방: {nowCalories[2]}g</Text>
        </View>

        <View style={[styles.card, styles.remainingCard]}>
          <Text style={[styles.cardTitle, { color: "#6F6CFF" }]}>
            오늘 남은 양
          </Text>
          <Text style={[styles.cardKcal, { color: "#6F6CFF" }]}>
            {targetCalories.reduce((sum, val) => sum + val, 0) -
              nowCalories.reduce((sum, val) => sum + val, 0)}
            kcal
          </Text>
          <Text style={styles.cardDetail}>
            탄수화물: {targetCalories[0] - nowCalories[0]}g
          </Text>
          <Text style={styles.cardDetail}>
            단백질: {targetCalories[1] - nowCalories[1]}g
          </Text>
          <Text style={styles.cardDetail}>
            지방: {targetCalories[2] - nowCalories[2]}g
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  greetingText: {
    marginTop: 80,
    fontSize: 22,
    color: "#FFF",
    marginVertical: 10,
  },
  nameText: {
    fontWeight: "bold",
  },
  highlightText: {
    color: "#6F6CFF",
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFF",
    marginVertical: 10,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
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
    height: 10,
    marginHorizontal: 2,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#333",
    borderRadius: 5,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  percentText: {
    fontSize: 12,
    color: "#BABABA",
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
    backgroundColor: "#FFF",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardKcal: {
    fontSize: 14,
    marginVertical: 5,
    color: "#FFF",
  },
  cardDetail: {
    fontSize: 12,
    color: "#FFF",
  },
});

export default Home;
