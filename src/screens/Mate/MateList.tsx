import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

interface Post {
  postId: number;
  meetTime: string;
  exerciseName: string;
  meetPlace: string;
  allNumberOfPeople: number;
  currentNumberOfPeople: number;
  gender: string;
}

const MateList = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const memberId = 1; // 현재 사용자 ID를 설정

  // API 호출 함수
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://172.20.10.10:8080/allposts?gender=FEMALE",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.isSuccess && data.result) {
        setPosts(data.result);
      } else {
        Alert.alert("오류", data.message || "데이터를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `서버 요청 실패: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  // 신청하기 API 호출 함수
  const applyToPost = async (postId: number) => {
    try {
      const response = await fetch("http://172.20.10.10:8080/applytopost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, memberId }),
      });

      const data = await response.json();
      if (data.isSuccess) {
        Alert.alert("성공", "신청이 완료되었습니다.");
        fetchPosts(); // 신청 후 게시글 상태 갱신
      } else {
        Alert.alert("오류", data.message || "신청에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `신청 요청 실패: ${(error as any).message}`);
    }
  };

  // 화면에 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        <Text style={styles.highlight}>운동메이트</Text>와 함께{"\n"}운동해보세요!
      </Text>

      {/* 검색창 */}
      <TextInput
        style={styles.searchInput}
        placeholder="검색"
        placeholderTextColor="#BABABA"
      />

      {/* 모임 생성 및 관리 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.navigate("MateCreate")}>
          <Text style={styles.linkText}>모임 생성</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate("MyMate")}>
          <Text style={styles.linkText}>모임 관리</Text>
        </TouchableOpacity>
      </View>

      {/* 로딩 표시 */}
      {loading ? (
        <Text style={styles.loadingText}>로딩 중...</Text>
      ) : (
        <ScrollView style={styles.listContainer}>
          {posts.map((post) => (
            <View key={post.postId} style={styles.card}>
              <Text style={styles.cardTitle}>{post.exerciseName}</Text>
              <Text style={styles.cardTime}>
                {new Date(post.meetTime).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text style={styles.cardLocation}>{post.meetPlace}</Text>
              <Text style={styles.cardGender}>
                {post.gender === "FEMALE"
                  ? "여성"
                  : post.gender === "MALE"
                  ? "남성"
                  : "성별무관"}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardParticipants}>
                  {post.currentNumberOfPeople}/{post.allNumberOfPeople}명
                </Text>
                {post.currentNumberOfPeople < post.allNumberOfPeople ? (
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => applyToPost(post.postId)}
                  >
                    <Text style={styles.applyButtonText}>신청하기</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.closedButton}>
                    <Text style={styles.closedButtonText}>모집마감</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
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
    marginTop: 40, // 뒤로가기 버튼 아래로
    textAlign: "center",
  },
  highlight: {
    color: "#6F6CFF",
    textDecorationLine: "underline",
  },
  searchInput: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#6F6CFF",
    fontSize: 16,
  },
  divider: {
    color: "#FFF",
    marginHorizontal: 10,
  },
  listContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: "#6F6CFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardTime: {
    fontSize: 14,
    color: "#BABABA",
    marginBottom: 5,
  },
  cardLocation: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 5,
  },
  cardGender: {
    fontSize: 12,
    color: "#BABABA",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardParticipants: {
    fontSize: 14,
    color: "#BABABA",
  },
  applyButton: {
    backgroundColor: "#6F6CFF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  applyButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  closedButton: {
    backgroundColor: "#BABABA",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  closedButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  loadingText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default MateList;
