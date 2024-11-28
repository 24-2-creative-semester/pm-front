import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RouteParams {
  exerciseId: number;
  exerciseName: string;
  exerciseCaloriesHour: number;
}

const ExerciseDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { exerciseId, exerciseName, exerciseCaloriesHour } =
    route.params as RouteParams;

  const [hours, setHours] = useState(""); // 시간 입력
  const [minutes, setMinutes] = useState(""); // 분 입력

  const handleAddExercise = async () => {
    if (!hours && !minutes) {
      Alert.alert("입력 오류", "운동 시간을 입력하세요.");
      return;
    }

    // 시간을 소수로 변환
    const totalTime =
      (parseInt(hours || "0") || 0) + (parseInt(minutes || "0") || 0) / 60;

    if (totalTime <= 0) {
      Alert.alert("입력 오류", "올바른 시간을 입력하세요.");
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log(exerciseId);
      const response = await fetch(
        "http://172.16.86.241:8080/exercise/doingExercise",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
          body: JSON.stringify({
            exerciseId: exerciseId,
            exerciseTime: totalTime,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        Alert.alert(
          "운동 추가 완료",
          `${exerciseName}이(가) 성공적으로 추가되었습니다.`
        );
        navigation.goBack();
      } else {
        Alert.alert("오류", data.message || "운동 추가 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("운동 추가 실패:", error);
      Alert.alert("오류", "운동 추가 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exerciseName}</Text>
      <Text style={styles.calories}>
        칼로리: {exerciseCaloriesHour} kcal/h
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>시간</Text>
        <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            placeholder="시간"
            placeholderTextColor="#AAAAAA"
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
          />
          <Text style={styles.timeSeparator}>:</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="분"
            placeholderTextColor="#AAAAAA"
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Text style={styles.addButtonText}>추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
    padding: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  calories: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 10,
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flex: 1,
    backgroundColor: "#252525",
    color: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginHorizontal: 5,
    textAlign: "center",
  },
  timeSeparator: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#6F6CFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExerciseDetail;