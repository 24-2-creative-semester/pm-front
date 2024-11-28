import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/types";

type MateCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, "MateCreate">;

const MateCreate = () => {
	const navigation = useNavigation<MateCreateScreenNavigationProp>();

	const [postTitle, setPostTitle] = useState("");
	const [postContent, setPostContent] = useState("");
	const [exerciseName, setExerciseName] = useState("");
	const [meetPlace, setMeetPlace] = useState("");
	const [numberOfPeople, setNumberOfPeople] = useState("");
	const [selectedGender, setSelectedGender] = useState<string | null>(null);
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [time, setTime] = useState("");

  // 날짜 선택 핸들러
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // POST 요청 함수
  const createPost = async () => {
    if (!postTitle || !postContent || !exerciseName || !meetPlace || !numberOfPeople || !selectedGender || !time) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    const requestBody = {
      postTitle,
      postContent,
      exerciseName,
      meetTime: `${date.toISOString().split("T")[0]}T${time}:00`,
      meetPlace,
      numberOfPeople: parseInt(numberOfPeople, 10),
      recruitmentGender: selectedGender === "남성" ? "MALE" : selectedGender === "여성" ? "FEMALE" : "ALL",
    };

    try {
      // Get the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        navigation.navigate("Login");
        return;
      }

      const response = await fetch("http://172.16.86.241:8080/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`, // Add token to headers
        },
        body: JSON.stringify(requestBody),
      });

	  console.log(requestBody);

      if (response.ok) {
        Alert.alert("성공", "모임이 생성되었습니다.");
        navigation.navigate("MateList");
      } else {
        const errorData = await response.json();
        Alert.alert("오류", `모임 생성 실패: ${errorData.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      Alert.alert("오류", `서버 요청 실패: ${(error as any).message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MateList")}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>모임 생성하기</Text>
        <TouchableOpacity onPress={createPost}>
          <Text style={styles.createText}>생성</Text>
        </TouchableOpacity>
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="제목이 들어갑니다"
          placeholderTextColor="#BABABA"
          value={postTitle}
          onChangeText={setPostTitle}
        />

        <Text style={styles.label}>내용</Text>
        <TextInput
          style={styles.input}
          placeholder="뚝섬역 2번출구에서 봐요!"
          placeholderTextColor="#BABABA"
          value={postContent}
          onChangeText={setPostContent}
        />

        <Text style={styles.label}>종목</Text>
        <TextInput
          style={styles.input}
          placeholder="테니스"
          placeholderTextColor="#BABABA"
          value={exerciseName}
          onChangeText={setExerciseName}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>날짜</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {date.toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <Modal transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                  <View style={styles.datePickerContainer}>
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={handleDateChange}
                      themeVariant="dark"
                      textColor="#FFF" // iOS에서 텍스트 색상 변경
                    />
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </View>
          <View style={[styles.column, styles.timeColumn]}>
            <Text style={styles.label}>시간</Text>
            <TextInput
              style={styles.input}
              placeholder="18:00"
              placeholderTextColor="#BABABA"
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>

        <Text style={styles.label}>인원</Text>
        <TextInput
          style={styles.input}
          placeholder="2명"
          placeholderTextColor="#BABABA"
          keyboardType="number-pad"
          value={numberOfPeople}
          onChangeText={setNumberOfPeople}
        />

        <Text style={styles.label}>성별</Text>
        <View style={styles.genderRow}>
          {["남성", "여성", "성별무관"].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderButton,
                selectedGender === gender && styles.selectedGender,
              ]}
              onPress={() => setSelectedGender(gender)}
            >
              <Text
                style={[
                  styles.genderText,
                  selectedGender === gender && styles.selectedGenderText,
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>장소</Text>
        <TextInput
          style={styles.input}
          placeholder="세종대학교"
          placeholderTextColor="#BABABA"
          value={meetPlace}
          onChangeText={setMeetPlace}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cancelText: {
    color: "#BABABA",
    fontSize: 16,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  createText: {
    color: "#6F6CFF",
    fontSize: 16,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#FFF",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    flex: 1,
  },
  timeColumn: {
    marginLeft: 15,
  },
  datePickerButton: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  datePickerText: {
    color: "#FFF",
    fontSize: 14,
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedGender: {
    backgroundColor: "#6F6CFF",
  },
  genderText: {
    color: "#FFF",
    fontSize: 14,
  },
  selectedGenderText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  datePickerContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default MateCreate;