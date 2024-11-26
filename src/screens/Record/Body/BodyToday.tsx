import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BodyToday: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 눈바디</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("SeeAllBody")}
      >
        <Icon name="images-outline" size={32} color="#FFFFFF" />
        <Text style={styles.addButtonText}>전체 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#6F6CFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default BodyToday;
