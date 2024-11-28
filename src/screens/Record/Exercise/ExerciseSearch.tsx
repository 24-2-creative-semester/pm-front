import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Exercise {
  exerciseName: string;
  exerciseCaloriesHour: number;
  exerciseId: number;
}

const ExerciseSearch: React.FC = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Fetch exercises whenever the page is focused
  useFocusEffect(
    useCallback(() => {
      fetchExercises();
    }, [])
  );

  const fetchExercises = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "http://172.16.86.241:8080/exercise/searchAll",
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
        if (Array.isArray(data.result)) {
          setExercises(data.result);
          // Log exerciseId for each fetched exercise
          data.result.forEach((exercise) =>
            console.log(`Fetched Exercise: ${exercise.exerciseName}, ID: ${exercise.exerciseId}`)
          );
        } else {
          Alert.alert("오류", "운동 데이터를 불러오는 데 문제가 있습니다.");
          setExercises([]);
        }
      } else {
        // Alert.alert("오류", data.message || "운동 목록을 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("운동 데이터 불러오기 실패:", error);
      Alert.alert("오류", "운동 목록을 불러오는 중 문제가 발생했습니다.");
    }
  };

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise?.exerciseName &&
      exercise.exerciseName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectExercise = (exercise: Exercise) => {
    console.log(`Selected Exercise ID: ${exercise.exerciseId}`); // Log the selected exerciseId
    navigation.navigate("ExerciseDetail", { ...exercise });
  };

  const handleAddExercise = () => {
    navigation.navigate("ExerciseEnroll");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="운동을 검색하세요"
          placeholderTextColor="#AAAAAA"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => `${item.exerciseId}`} // Use exerciseId as the key
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.exerciseName}</Text>
            <Text style={styles.exerciseCalories}>
              {item.exerciseCaloriesHour} kcal/h
            </Text>
            <TouchableOpacity onPress={() => handleSelectExercise(item)}>
              <Icon name="chevron-forward-outline" size={24} color="#6F6CFF" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddExercise}>
        <Icon name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    backgroundColor: "#252525",
    padding: 10,
    marginTop:60,
    margin: 20,
    borderRadius: 8,
  },
  searchInput: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  exerciseName: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  exerciseCalories: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#6F6CFF",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExerciseSearch;