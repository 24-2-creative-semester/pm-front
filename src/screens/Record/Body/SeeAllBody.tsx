import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EyeBodyDto {
  base64: string;
  imgId: number;
}

const SeeAllBody: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [images, setImages] = useState<EyeBodyDto[]>([]); // EyeBodyDto 배열로 정의

  useEffect(() => {
    console.log("useEffect 실행");
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      console.log("accessToken:", accessToken);

      const response = await fetch("http://172.16.86.241:8080/api/getImageList", {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`, // Bearer 토큰 형식으로 설정
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("응답 데이터:", data);

        if (data.isSuccess && Array.isArray(data.result)) {
          setImages(data.result); // EyeBodyDto 배열 설정
        } else {
          console.error("Invalid response format:", data.message);
          Alert.alert("오류", data.message || "이미지 데이터를 처리할 수 없습니다.");
        }
      } else {
        const errorText = await response.text();
        console.error("API 응답 오류:", errorText);
        Alert.alert("오류", "이미지 목록을 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("이미지 목록 불러오기 실패:", error);
      Alert.alert("오류", "이미지 목록을 불러오는 중 문제가 발생했습니다.");
    }
  };

  const handleImagePress = (image: EyeBodyDto) => {
    navigation.navigate("BodySpecific", { imageId: image.imgId, date: new Date().toISOString() }); // imgId와 날짜 전달
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.base64}` }} // Base64 이미지 표시
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.imgId.toString()} // imgId를 키로 사용
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});

export default SeeAllBody;
