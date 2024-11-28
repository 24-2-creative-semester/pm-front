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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/types";

interface Post {
  postId: number;
  meetTime: string;
  exerciseName: string;
  meetPlace: string;
  allNumberOfPeople: number;
  currentNumberOfPeople: number;
  gender: string;
}

type MateCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, "MateList">;

const MateList = () => {
  const navigation = useNavigation<MateCreateScreenNavigationProp>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // 검색된 게시글
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [loading, setLoading] = useState(false);

  // API 호출 함수
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        navigation.navigate("Login");
        return;
      }
  
      const response = await fetch("http://172.16.86.241:8080/allposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
  
      const data = await response.json();
      if (data.isSuccess && data.result) {
        setPosts(data.result);
        setFilteredPosts(data.result); // 초기 데이터 설정
      } else {
        Alert.alert("오류", data.message || "데이터를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `서버 요청 실패: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const applyToPost = async (postId: number) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        navigation.navigate("Login");
        return;
      }
  
      const response = await fetch("http://172.16.86.241:8080/applytopost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ postId }),
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

  // 검색 핸들러
  const handleSearch = (text: string) => {
    setSearchTerm(text); // 검색어 업데이트
    const filtered = posts.filter((post) =>
      post.exerciseName.toLowerCase().includes(text.toLowerCase()) ||
      post.meetPlace.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filtered); // 필터링된 게시글 업데이트
  };

  // 화면에 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.highlight}>운동메이트</Text>와 함께{"\n"}운동해보세요!
      </Text>

      {/* 검색창 */}
      <TextInput
        style={styles.searchInput}
        placeholder="검색"
        placeholderTextColor="#BABABA"
        value={searchTerm}
        onChangeText={handleSearch} // 검색어 변경 시 필터링 실행
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
          {filteredPosts.map((post) => (
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
  title: {
    marginTop:20,
    fontSize: 22,
    color: "#FFF",
    marginBottom: 30,
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
