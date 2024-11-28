import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderLayout from "../../../components/HeaderLayout";

const WeightRegisterScreen = ({ route, navigation }: any) => {
  const [memberWeight, setMemberWeight] = useState("");
  const [skeletalmuscle, setSkeletalmuscle] = useState("");
  const [bodyfat, setBodyfat] = useState("");

  const isButtonDisabled =
    memberWeight === "" || skeletalmuscle === "" || bodyfat === "";
  const dateFromDietMain =
    route.params?.date || new Date().toISOString().split("T")[0];

  const sendDataToServer = async () => {
    try {
      const response = await fetch("http://172.16.86.241:8080/createweight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberWeight: parseFloat(memberWeight),
          memberSkeletalmuscle: parseFloat(skeletalmuscle),
          memberBodyfat: parseFloat(bodyfat),
          today: dateFromDietMain, // 전달받은 날짜 사용
        }),
      });

      const data = await response.json();
      console.log("weightbefor", dateFromDietMain);
      // 서버 응답 처리
      if (data.isSuccess) {
        Alert.alert("성공", "체중이 성공적으로 등록되었습니다.", [
          {
            text: "확인",
            onPress: () => {
              // WeightAfter로 데이터와 날짜 전달 후 화면 이동
              navigation.navigate("WeightAfter", {
                date: dateFromDietMain,
              });
            },
          },
        ]);
      } else {
        Alert.alert("실패", "체중 등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("오류", "서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HeaderLayout 추가 */}
      <HeaderLayout
        selectedDate={dateFromDietMain}
        onDateChange={(newDate) => {
          // 변경된 날짜 처리
          console.log("New Date Selected:", newDate);
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.messageText}>
            아직 체중이 등록되지 않았어요. 오늘의 체중을 등록하세요!
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>몸무게 (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="몸무게 입력"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={memberWeight}
              onChangeText={setMemberWeight}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>골격근량 (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="골격근량 입력"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={skeletalmuscle}
              onChangeText={setSkeletalmuscle}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>체지방량 (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="체지방량 입력"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={bodyfat}
              onChangeText={setBodyfat}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled,
            ]}
            disabled={isButtonDisabled}
            onPress={sendDataToServer} // 버튼 눌렀을 때 서버로 데이터 전송
          >
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
        </ScrollView>
      </HeaderLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  messageText: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  labelText: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 5,
    padding: 10,
    color: "white",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#4a4a4a",
  },
  buttonEnabled: {
    backgroundColor: "#7c77ff",
  },
  buttonText: {
    color: "#1D1B20",
    fontSize: 18,
  },
});

export default WeightRegisterScreen;
