import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation 훅 추가
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Post {
  postId: number;
  postTitle: string;
  meetPlace: string;
  exerciseName: string;
  meetTime: string;
  allNumberOfPeople: number;
  currentNumberOfPeople: number;
}

const MyMate = () => {
  const navigation = useNavigation(); // Navigation 훅 사용
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [myApplications, setMyApplications] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  // /myposts API 호출
  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch("http://192.168.45.176:8080/myposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        setMyPosts(data.result);
      } else {
        Alert.alert("오류", data.message || "내 게시글을 불러올 수 없습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `내 게시글 요청 실패: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  // /myapplicants API 호출
  const fetchMyApplications = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`http://192.168.45.176:8080/myapplicants`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        setMyApplications(data.result);
      } else {
        Alert.alert("오류", data.message || "신청한 게시글을 불러올 수 없습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `신청한 게시글 요청 실패: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 삭제 함수
  const deletePost = async (postId: number) => {
    try {
      const response = await fetch("http://192.168.45.176:8080/deletepost", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      const data = await response.json();
      if (data.isSuccess) {
        Alert.alert("성공", "게시글이 삭제되었습니다.");
        fetchMyPosts(); // 삭제 후 데이터 갱신
      } else {
        Alert.alert("오류", data.message || "게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `게시글 삭제 요청 실패: ${(error as any).message}`);
    }
  };

  // 참여 취소 함수
  const cancelApplication = async (postId: number) => {
    try {
      const response = await fetch("http://192.168.45.176:8080/deleteapplicant", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      const data = await response.json();
      if (data.isSuccess) {
        Alert.alert("성공", "참여가 취소되었습니다.");
        fetchMyApplications(); // 취소 후 데이터 갱신
      } else {
        Alert.alert("오류", data.message || "참여 취소에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `참여 취소 요청 실패: ${(error as any).message}`);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchMyPosts();
    fetchMyApplications();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>모임 관리</Text>

      {loading ? (
        <Text style={styles.loadingText}>로딩 중...</Text>
      ) : (
        <ScrollView>
          {/* 내가 생성한 게시글 */}
          <Text style={styles.sectionTitle}>내가 생성한 모임</Text>
          {myPosts.map((post) => (
            <View key={post.postId} style={styles.card}>
              <Text style={styles.cardTitle}>{post.exerciseName}</Text>
              <Text style={styles.cardDetails}>{post.postTitle}</Text>
              <Text style={styles.cardDetails}>
                {new Date(post.meetTime).toLocaleString("ko-KR")}
              </Text>
              <Text style={styles.cardDetails}>{post.meetPlace}</Text>
              <Text style={styles.cardDetails}>
                {post.currentNumberOfPeople}/{post.allNumberOfPeople}명
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePost(post.postId)}
              >
                <Text style={styles.deleteButtonText}>모임 취소</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* 내가 신청한 게시글 */}
          <Text style={styles.sectionTitle}>내가 신청한 모임</Text>
          {myApplications.map((post) => (
            <View key={post.postId} style={styles.card}>
              <Text style={styles.cardTitle}>{post.exerciseName}</Text>
              <Text style={styles.cardDetails}>{post.postTitle}</Text>
              <Text style={styles.cardDetails}>
                {new Date(post.meetTime).toLocaleString("ko-KR")}
              </Text>
              <Text style={styles.cardDetails}>{post.meetPlace}</Text>
              <Text style={styles.cardDetails}>
                {post.currentNumberOfPeople}/{post.allNumberOfPeople}명
              </Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => cancelApplication(post.postId)}
              >
                <Text style={styles.cancelButtonText}>참여 취소</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#6F6CFF",
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: "#6F6CFF",
    marginBottom: 5,
  },
  cardDetails: {
    fontSize: 14,
    color: "#BABABA",
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "#FF6C6C",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: "#6F6CFF",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 14,
  },
});

export default MyMate;