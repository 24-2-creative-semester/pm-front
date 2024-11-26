import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BodySpecific: React.FC<{ route: any }> = ({ route }) => {
  const { imageId, date } = route.params;
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        `http://172.16.4.171:8080/api/getImage?id=${imageId}`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        setImageUri(URL.createObjectURL(blob));
      } else {
        Alert.alert("오류", "이미지를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("이미지 불러오기 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>이미지를 불러오는 중입니다...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  date: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  placeholder: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default BodySpecific;
