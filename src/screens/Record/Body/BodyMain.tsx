import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RecordTabSelector from "../../../components/RecordTabSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

interface BodyImage {
  id: number;
  date: string;
  img: string;
}

const BodyMain: React.FC = () => {
  const [todayImage, setTodayImage] = useState<string | null>(null);
  const [tabs, setTabs] = useState([
    { name: "식단", route: "DietMain" },
    { name: "운동", route: "ExerciseMain" },
    { name: "눈바디", route: "BodyMain" },
    { name: "체중", route: "WeightMain" },
  ]);

  useEffect(() => {
    fetchTodayImage();
  }, []);

  const fetchTodayImage = async () => {
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
        const today = new Date().toISOString().split("T")[0];
        const image = data.result.find(
          (img: BodyImage) => img.date.startsWith(today)
        );
        setTodayImage(image ? image.img : null);
      } else {
        Alert.alert("오류", "오늘의 눈바디 이미지를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("눈바디 이미지 불러오기 실패:", error);
      Alert.alert("오류", "이미지를 불러오는 중 문제가 발생했습니다.");
    }
  };

  const handleTakePhoto = async () => {
    const result = await launchCamera({
      mediaType: "photo",
      includeBase64: true,
    });

    if (result.didCancel) return;
    if (result.assets && result.assets.length > 0) {
      uploadImage(result.assets[0].uri);
    } else {
      Alert.alert("오류", "사진 촬영에 실패했습니다.");
    }
  };

  const handleUploadPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
    });

    if (result.didCancel) return;
    if (result.assets && result.assets.length > 0) {
      uploadImage(result.assets[0].uri);
    } else {
      Alert.alert("오류", "사진 업로드에 실패했습니다.");
    }
  };
  const uploadImage = async (uri: string) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
  
      // iOS 시뮬레이터의 로컬 파일 경로 문제 해결
      const formattedUri =
        Platform.OS === "ios" && !uri.startsWith("file://")
          ? `file://${uri}`
          : uri;
  
      const formData = new FormData();
      formData.append("img", {
        uri: formattedUri,
        name: "body_image.jpg",
        type: "image/jpeg",
      });
  
      const response = await fetch("http://172.16.4.171:8080/api/saveImage", {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok && data.isSuccess) {
        Alert.alert("업로드 성공", "이미지가 성공적으로 업로드되었습니다.");
        fetchTodayImage(); // 업로드 후 이미지 갱신
      } else {
        Alert.alert("오류", data.message || "이미지 업로드 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      Alert.alert("오류", "이미지 업로드 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 탭 네비게이션 */}
      <ScrollView style={styles.scrollView}>
        <RecordTabSelector tabs={tabs} activeTab="BodyMain" />

        {/* 오늘의 눈바디 */}
        <View style={styles.content}>
          {todayImage ? (
            <View style={styles.section}>
              <Text style={styles.title}>오늘의 눈바디</Text>
              <Image source={{ uri: todayImage }} style={styles.image} />
            </View>
          ) : (
            <View style={styles.section}>
              <Text style={styles.infoText}>
                {"아직 눈바디가 등록되지 않았어요.\n오늘의 눈바디를 등록하세요!"}
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                <Text style={styles.buttonText}>사진 찍기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleUploadPhoto}
              >
                <Text style={styles.buttonText}>사진 등록하기</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => navigation.navigate("SeeAllBody")}
          >
            <Text style={styles.floatingButtonText}>전체 보기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  section: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    marginBottom: 20,
  },
  infoText: {
    color: "#625F67",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
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
  floatingButton: {
    backgroundColor: "#6F6CFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  floatingButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default BodyMain;
