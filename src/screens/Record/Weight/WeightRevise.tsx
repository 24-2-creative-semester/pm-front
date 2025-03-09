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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigations/types";
import HeaderLayout from "../../../components/HeaderLayout";

type WeightReviseNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DietMain"
>;

const WeightRegisterScreen = ({ route }: any) => {
  const [memberWeight, setMemberWeight] = useState("");
  const [skeletalmuscle, setSkeletalmuscle] = useState("");
  const [bodyfat, setBodyfat] = useState("");
  const navigation = useNavigation<WeightReviseNavigationProp>();

  const dateFromWeightAfter =
    route.params?.date || new Date().toISOString().split("T")[0];

  const isButtonDisabled =
    memberWeight === "" || skeletalmuscle === "" || bodyfat === "";

  const sendDataToServer = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "/rewriteweight",
        {
          method: "PUT",
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberWeight: parseFloat(memberWeight),
            memberSkeletalmuscle: parseFloat(skeletalmuscle),
            memberBodyfat: parseFloat(bodyfat),
            today: dateFromWeightAfter,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.isSuccess) {
        Alert.alert("성공", "체중이 성공적으로 등록되었습니다.", [
          {
            text: "확인",
            onPress: () =>
              navigation.navigate("WeightAfter", {
                date: dateFromWeightAfter,
              }),
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
      {/* HeaderLayout 적용 */}
      <HeaderLayout
        selectedDate={dateFromWeightAfter}
        onDateChange={(date) => {
          console.log("날짜 변경:", date);
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.messageText}>수정 값을 입력하세요</Text>

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
              isButtonDisabled
                ? styles.buttonDisabled
                : styles.buttonEnabled,
            ]}
            disabled={isButtonDisabled}
            onPress={sendDataToServer}
          >
            <Text style={styles.buttonText}>수정</Text>
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
