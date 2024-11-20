import React, { useState } from "react";
// import { API_BASE_URL } from "@env";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/LoginStyles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "src/navigations/types";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://172.20.10.10:8080/login/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const accessToken = response.headers.get("Authorization");
      const refreshToken = response.headers.get("Set-Cookie");

      const data = await response.json();

      if (data.isSuccess) {
        if (accessToken) {
          await AsyncStorage.setItem("accessToken", accessToken);
          console.log("Access Token:", accessToken);
        }
        if (refreshToken) {
          await AsyncStorage.setItem("refreshToken", refreshToken);
        }
        Alert.alert("로그인 성공", data.message);
        navigation.navigate("ProfileSetup");
      } else {
        Alert.alert("로그인 실패", data.message);
      }
    } catch (error) {
      Alert.alert("에러", "네트워크 연결에 문제가 있습니다.");
    }
	  // navigation.navigate("ProfileSetup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>PM</Text>
      <Text style={styles.subtext}>당신만을 위한 건강, 지금 로그인하세요!</Text>

      <TextInput
        placeholder="아이디"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <Text style={styles.signupPrompt}>아직 계정이 없으신가요?</Text>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.socialLoginContainer}>
        <Text style={styles.socialLoginText}>간편 로그인</Text>
        <TouchableOpacity style={styles.kakaoButton}>
          <Text>K</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
