import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "../styles/SignupStyles";
// import { API_BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const [gender, setGender] = useState("남성");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigation = useNavigation(); // 네비게이션 객체

  const handleGenderSelection = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const validatePassword = (inputPassword: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return passwordRegex.test(inputPassword);
  };

  const handlePasswordChange = (inputPassword: string) => {
    setPassword(inputPassword);
    setIsPasswordValid(validatePassword(inputPassword));
  };

  const isFormValid = () => {
    return (
      email.trim().length > 0 &&
      isPasswordValid &&
      password === confirmPassword
    );
  };

  const handleSignup = async () => {
    if (!isFormValid()) {
      Alert.alert("입력 오류", "모든 필드를 올바르게 입력해 주세요.");
      return;
    }
  
    try {
      const response = await fetch(`http://172.16.4.171:8080/signup/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gender,
          email,
          password,
        }),
      });
  
      const data = await response.json();
      console.log("Response:", response);
      console.log("Data:", data);
  
      if (data.isSuccess) {
        Alert.alert("회원가입 성공", data.message);
        navigation.goBack();
      } else {
        Alert.alert("회원가입 실패", data.message || "오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("에러", "네트워크 연결에 문제가 있습니다.");
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity> 

      <Text style={styles.title}>회원가입을 위해{"\n"}정보를 입력해 주세요</Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "MALE" && styles.selectedGenderButton,
          ]}
          onPress={() => handleGenderSelection("MALE")}
        >
          <Text
            style={[
              styles.genderButtonText,
              gender === "MALE" && styles.selectedGenderButtonText,
            ]}
          >
            남성
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "FEMALE" && styles.selectedGenderButton,
          ]}
          onPress={() => handleGenderSelection("FEMALE")}
        >
          <Text
            style={[
              styles.genderButtonText,
              gender === "FEMALE" && styles.selectedGenderButtonText,
            ]}
          >
            여성
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일 주소를 입력하세요"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={[
          styles.inputPwd,
          !isPasswordValid && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Text style={styles.passwordHint}>
        8~15자 (문자, 숫자, 특수문자 포함)
      </Text>
      {!isPasswordValid && (
        <Text style={{ color: "red", marginLeft: 24, marginBottom: 16 }}>
          비밀번호는 8~15자, 문자, 숫자, 특수문자를 포함해야 합니다.
        </Text>
      )}
      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 다시 입력하세요"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          !isFormValid() && styles.disabledSubmitButton,
        ]}
        disabled={!isFormValid()}
        onPress={handleSignup}
      >
        <Text
          style={[
            styles.submitButtonText,
            !isFormValid() && styles.disabledSubmitButtonText,
          ]}
        >
          완료
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Signup;
