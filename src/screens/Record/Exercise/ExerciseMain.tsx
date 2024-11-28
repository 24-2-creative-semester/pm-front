import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RecordTabSelector from "../../../components/RecordTabSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { RecordStackParamList } from "../../../navigations/RecordStackNavigator";

interface Exercise {
  exerciseName: string;
  exerciseCalories: number;
  exerciseTime: number;
  exerciseId: number;
}

type NavigationProp = StackNavigationProp<RecordStackParamList, "ExerciseMain">;

const ExerciseMain: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetchTodayExercises(); // 화면에 다시 포커스가 들어오면 데이터 새로 가져오기
    }, [])
  );

  const fetchTodayExercises = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "http://172.16.86.241:8080/exercise/todayList",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log("Today Exercises:", data);
  
      if (response.ok && data.isSuccess) {
        const updatedExercises = data.result.map((exercise: any) => ({
          exerciseName: exercise.exerciseName,
          exerciseCalories: exercise.exerciseCalories,
          exerciseTime: Math.round(exercise.exerciseTime * 60), // **시간을 분으로 변환**
          exerciseId: exercise.exerciseId,
        }));
  
        setExercises(updatedExercises);
  
        const totalCalories = updatedExercises.reduce(
          (sum: number, exercise: any) => sum + exercise.exerciseCalories,
          0
        );
        setTotalCalories(totalCalories);
      } else {
        // Alert.alert("오류", data.message || "운동 정보를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("운동 데이터 불러오기 실패:", error);
      Alert.alert("오류", "운동 정보를 불러오는 중 문제가 발생했습니다.");
    }
  };
  

  const handleAddExercise = () => {
    navigation.navigate("ExerciseSearch"); // 운동 검색 화면으로 이동
  };

  const handleRemoveExercise = async (exerciseId: number) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        `http://172.16.86.241:8080/exercise/deleteExercise?exerciseId=${exerciseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        Alert.alert("삭제 완료", "운동이 성공적으로 삭제되었습니다.");
        fetchTodayExercises(); // 데이터 새로고침
      } else {
        Alert.alert("오류", data.message || "운동 삭제 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("운동 삭제 실패:", error);
      Alert.alert("오류", "운동 삭제 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 네비게이션 및 날짜 */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.row3}>
            <Icon name="chevron-back-outline" size={32} color="#FFFFFF" />
            <Text style={styles.text2}>2024 09 14</Text>
            <Icon name="chevron-forward-outline" size={32} color="#FFFFFF" />
          </View>
          <RecordTabSelector />
        </View>

        {/* 오늘 소모한 칼로리 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>오늘 소모한 칼로리</Text>
          <Text style={styles.totalCalories}>{`총 ${totalCalories}kcal`}</Text>
        </View>

        {/* 오늘의 운동 목록 */}
        <View style={styles.exerciseList}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseHeaderTitle}>오늘의 운동</Text>
            <TouchableOpacity onPress={handleAddExercise}>
              <Icon name="add-circle-outline" size={32} color="#6F6CFF" />
            </TouchableOpacity>
          </View>
          {exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
              <Text style={styles.exerciseInfo}>
                {exercise.exerciseCalories}kcal / {exercise.exerciseTime}mins
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveExercise(exercise.exerciseId)}
              >
                <Icon name="close-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
  },
  scrollView: {
    flex: 1,
  },
  column: {
    backgroundColor: "#1D1B20",
    paddingVertical: 11,
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginHorizontal: 30,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  card: {
    backgroundColor: "#6F6CFF",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 10,
  },
  totalCalories: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  exerciseList: {
    backgroundColor: "#252525",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  exerciseHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A",
  },
  exerciseName: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
  exerciseInfo: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default ExerciseMain;
