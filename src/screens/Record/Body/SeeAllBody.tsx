import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SeeAllBody: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch("http://172.16.4.171:8080/api/getImageList", {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.isSuccess) {
        setImages(data.result);
      }
    } catch (error) {
      console.error("이미지 목록 불러오기 실패:", error);
    }
  };

  const handleImagePress = (imageId: number, date: string) => {
    navigation.navigate("BodySpecific", { imageId, date });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleImagePress(item.id, item.date)}
          >
            <Image source={{ uri: item.img }} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
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
