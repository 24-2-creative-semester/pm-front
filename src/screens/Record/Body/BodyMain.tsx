import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TabSelector from "../../../components/RecordTabSelector";

const BodyMain = () => {
  const [activeTab, setActiveTab] = useState("눈바디");

  const tabs = [
    { name: "식단", route: "식단" },
    { name: "운동", route: "운동" },
    { name: "눈바디", route: "눈바디" },
    { name: "체중", route: "체중" },
  ];

  const handleTabPress = (route: string) => {
    setActiveTab(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 탭 네비게이션 */}
      <TabSelector tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          {activeTab === "눈바디" && (
            <View style={styles.section}>
              <Text style={styles.infoText}>
                {"아직 눈바디가 등록되지 않았어요.\n오늘의 눈바디를 등록하세요!"}
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>사진 찍기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>사진 등록하기</Text>
              </TouchableOpacity>
            </View>
          )}
          {activeTab === "식단" && (
            <View style={styles.section}>
              <Text style={styles.infoText}>여기에 식단 관련 내용을 추가하세요.</Text>
            </View>
          )}
          {activeTab === "운동" && (
            <View style={styles.section}>
              <Text style={styles.infoText}>운동 관련 내용을 추가하세요.</Text>
            </View>
          )}
          {activeTab === "체중" && (
            <View style={styles.section}>
              <Text style={styles.infoText}>체중 관련 내용을 추가하세요.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
  },
  scrollContainer: {
    flex: 1,
	backgroundColor: "#1D1B20",
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  section: {
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    color: "#625F67",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6F6CFF",
    borderRadius: 8,
    paddingVertical: 15,
    marginBottom: 10,
    width: "80%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BodyMain;
