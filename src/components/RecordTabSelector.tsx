import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigations/types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const RecordTabSelector: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<keyof RootStackParamList>("DietMain");

  // 탭 정보 정의
  const tabs = [
    { name: "식단", route: "DietMain" as keyof RootStackParamList },
    { name: "운동", route: "ExerciseMain" as keyof RootStackParamList },
    { name: "눈바디", route: "BodyMain" as keyof RootStackParamList },
    { name: "체중", route: "WeightBefore" as keyof RootStackParamList },
  ];

  const handleTabPress = (route: keyof RootStackParamList) => {
    setActiveTab(route); // 현재 활성화된 탭 업데이트
    navigation.navigate(route); // 네비게이션 이동
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.route}
          onPress={() => handleTabPress(tab.route)}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              tab.route === activeTab && styles.activeTabText,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  activeTabText: {
    color: "#6F6CFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RecordTabSelector;
