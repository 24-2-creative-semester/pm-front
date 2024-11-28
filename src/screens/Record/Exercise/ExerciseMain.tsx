import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import HeaderLayout from "../../../components/HeaderLayout";
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
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByDate(selectedDate); // 화면에 포커스가 들어올 때 데이터 갱신
    }, [selectedDate])
  );

  const fetchExercisesByDate = async (date: string) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        `http://172.16.86.241:8080/exercise/todayList?today=${date}`, // 날짜 기반 API로 수정
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `${accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log("Exercises for Date:", data);

      if (response.ok && data.isSuccess) {
        const updatedExercises = data.result.map((exercise: any) => ({
          exerciseName: exercise.exerciseName,
          exerciseCalories: exercise.exerciseCalories,
          exerciseTime: Math.round(exercise.exerciseTime * 60), // 시간을 분으로 변환
          exerciseId: exercise.memberExerciseId,
        }));

        setExercises(updatedExercises);

        const totalCalories = updatedExercises.reduce(
          (sum: number, exercise: any) => sum + exercise.exerciseCalories,
          0
        );
        setTotalCalories(totalCalories);
      } else {
        setExercises([]);
        setTotalCalories(0);
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
        `http://172.16.86.241:8080/exercise/deleteMemberExercise?memberExerciseId=${exerciseId}`,
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
        fetchExercisesByDate(selectedDate); // 데이터 새로고침
      } else {
        Alert.alert("오류", data.message || "운동 삭제 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("운동 삭제 실패:", error);
      Alert.alert("오류", "운동 삭제 중 문제가 발생했습니다.");
    }
  };

  return (
    <HeaderLayout
      selectedDate={selectedDate}
      onDateChange={(date) => setSelectedDate(date)}
    >
      <ScrollView style={styles.scrollView}>
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
    </HeaderLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
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
