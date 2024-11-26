import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ExerciseEnroll: React.FC = () => {
  const navigation = useNavigation();
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCaloriesHour, setExerciseCaloriesHour] = useState("");

  const handleSaveExercise = async () => {
    if (!exerciseName || !exerciseCaloriesHour) {
      Alert.alert("입력 오류", "운동 이름과 칼로리를 모두 입력하세요.");
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch("http://172.16.4.171:8080/exercise/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`, // JWT Token 포함
        },
        body: JSON.stringify({
          exerciseName: exerciseName,
          exerciseCaloriesHour: parseFloat(exerciseCaloriesHour),
        }),
      });

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        Alert.alert("운동 등록 완료", `${exerciseName}이(가) 성공적으로 등록되었습니다.`);
        navigation.goBack();
      } else {
        Alert.alert("오류", data.message || "운동 등록 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("운동 등록 실패:", error);
      Alert.alert("오류", "운동 등록 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="운동 이름을 입력하세요"
          placeholderTextColor="#AAAAAA"
          value={exerciseName}
          onChangeText={setExerciseName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>칼로리 (kcal/h)</Text>
        <TextInput
          style={styles.input}
          placeholder="시간당 소모 칼로리 입력"
          placeholderTextColor="#AAAAAA"
          keyboardType="numeric"
          value={exerciseCaloriesHour}
          onChangeText={setExerciseCaloriesHour}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveExercise}>
        <Text style={styles.saveButtonText}>완료</Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#252525",
    color: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#6F6CFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExerciseEnroll;
