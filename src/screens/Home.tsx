import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import MainTabNavigator from "../navigations/MainTabNavigator";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 상단 텍스트 */}
        <Text style={styles.greetingText}>
          <Text style={styles.nameText}>김주원님은{"\n"}</Text>
          <Text style={styles.highlightText}>카토제닉 다이어트</Text>
          {" 중이에요!"}
        </Text>

        {/* 목표 달성률 */}
        <Text style={styles.sectionTitle}>오늘의 목표 달성률</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { backgroundColor: "#6F6CFF", width: "20%" }]}
          />
          <View
            style={[styles.progressBar, { backgroundColor: "#D6FF0A", width: "50%" }]}
          />
          <View
            style={[styles.progressBar, { backgroundColor: "#69FFD7", width: "30%" }]}
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.labelText}>20%</Text>
          <Text style={styles.labelText}>50%</Text>
          <Text style={styles.labelText}>30%</Text>
        </View>

        {/* 오늘 먹은 양 */}
        <View style={[styles.card, styles.eatenCard]}>
          <Text style={styles.cardTitle}>오늘 먹은 양</Text>
          <Text style={styles.cardKcal}>1500kcal</Text>
          <Text style={styles.cardDetail}>탄수화물: 150g</Text>
          <Text style={styles.cardDetail}>단백질: 50g</Text>
          <Text style={styles.cardDetail}>지방: 10g</Text>
        </View>

        {/* 오늘 남은 양 */}
        <View style={[styles.card, styles.remainingCard]}>
          <Text style={[styles.cardTitle, { color: "#6F6CFF" }]}>오늘 남은 양</Text>
          <Text style={[styles.cardKcal, { color: "#6F6CFF" }]}>150kcal</Text>
          <Text style={styles.cardDetail}>탄수화물: 15g</Text>
          <Text style={styles.cardDetail}>단백질: 5g</Text>
          <Text style={styles.cardDetail}>지방: 1g</Text>
        </View>
      </ScrollView>
      {/* 네비게이션 컴포넌트는 ScrollView 밖에 위치 */}
      <MainTabNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  greetingText: {
    marginTop: 80,
    fontSize: 22,
    color: "#FFF",
    marginVertical: 10,
  },
  nameText: {
    fontWeight: "bold",
  },
  highlightText: {
    color: "#6F6CFF",
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFF",
    marginVertical: 10,
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  labelText: {
    fontSize: 12,
    color: "#BABABA",
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  eatenCard: {
    backgroundColor: "#6F6CFF",
  },
  remainingCard: {
    backgroundColor: "#FFF",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardKcal: {
    fontSize: 14,
    marginVertical: 5,
    color: "#FFF",
  },
  cardDetail: {
    fontSize: 12,
    color: "#FFF",
  },
});

export default Home;
