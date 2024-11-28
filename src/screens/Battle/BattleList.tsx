import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, Button,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 멤버 타입 정의
interface Member {
  opponentName: string;
  opponentImage: string;
  startDay: string;
  targetDay: string;
  battleId: string;  // battleId 추가
  memberId: string;  // memberId 추가
}

type BattleListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BattleResult'>;
// D-Day 계산 함수
const calculateDays = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// BattleList 컴포넌트
const BattleList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const navigation = useNavigation<BattleListScreenNavigationProp>(); // 타입 지정
  //
  // API 호출 함수
  const fetchMembers = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const url = `http://172.16.86.241:8080/battlelist`; // URL 수정
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`, // 토큰을 헤더로 추가
        },
      });

      const data = await response.json();
      if (data.isSuccess) {
        setMembers(data.result); // 결과 배열 처리
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchMembers();
  }, []);

  // 목표 날짜가 지난 경우 체크하는 함수
  const isTargetDateReached = (targetDay: string) => {
    const today = new Date();
    const targetDate = new Date(targetDay);
    return targetDate <= today;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.column}>
          {members.map((member, index) => (
            <TouchableOpacity
              key={member.battleId}
              style={styles.column2}
              onPress={() =>
                navigation.navigate("BattleOtherState", {
                  battleId: member.battleId, // battleId 전달
                })
              }
            >
              <View style={styles.row}>
                <Image
                  source={{ uri: member.opponentImage || "https://i.imgur.com/1tMFzp8.png" }}
                  resizeMode={"stretch"}
                  style={styles.column3}
                />
                <View style={styles.column4}>
                  <View style={styles.row2}>
                    <Text style={styles.text}>{member.opponentName}</Text>
                    {isTargetDateReached(member.targetDay) ? (
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation(); // 카드 클릭과 분리
                          navigation.navigate("BattleResult", {
                            battleId: member.battleId, // battleId 전달
                            memberId: member.memberId, // memberId 전달
                          });
                        }}
                      >
                        <Text style={styles.resultButton}>결과보기</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.text2}>
                        {"D-" + calculateDays(member.startDay, member.targetDay)}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.text3}>
                    {member.startDay} - {member.targetDay}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BattleList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        
    },
    absoluteColumn: {
        position: "absolute",
        top: -1,
        right: 0,
        left: 0,
        height: 135,
        backgroundColor: "#1D1B20",
        paddingRight: 32,
    },
    box: {
        height: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        marginHorizontal: 127,
    },
    box2: {
        width: 80,
        height: 37,
        backgroundColor: "#000000",
        borderRadius: 100,
    },
    box3: {
        width: 37,
        height: 37,
        backgroundColor: "#000000",
        borderRadius: 100,
    },
    box4: {
        height: 9,
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        marginTop: 2,
    },
    box5: {
        width: 1,
        height: 4,
        backgroundColor: "#FFFFFF",
    },
    column: {
        marginTop: 1,
    },
    column2: {
        backgroundColor: "#1D1B20",
        paddingTop: 18,
    },
    column3: {
        width: 70,
        height:70,
        backgroundColor: "#625E67",
        borderRadius: 4,
        paddingTop: 19,
        paddingBottom: 1,
    },
    column4: {
        width: 226,
    },
    column5: {
        width: 225,
    },
    column6: {
        backgroundColor: "#1D1B20",
        paddingTop: 28,
        paddingBottom: 8,
    },
    image: {
        height: 24,
        marginBottom: 7,
        marginHorizontal: 23,
    },
    image2: {
        height: 19,
        marginHorizontal: 10,
    },
    image3: {
        width: 27,
        height: 27,
    },
    image4: {
        width: 18,
        height: 12,
        marginRight: 8,
    },
    image5: {
        width: 17,
        height: 11,
        marginRight: 8,
    },
    image6: {
        width: 9,
        height: 19,
        marginRight: 119,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 15,
        marginBottom: 24,
        marginHorizontal: 24,
    },
    row2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },
    row3: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 15,
        marginBottom: 8,
        marginHorizontal: 24,
    },
    row4: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7,
        marginHorizontal: 29,
    },
    row5: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 19,
        marginHorizontal: 21,
    },
    row6: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 11,
        marginBottom: 37,
        marginLeft: 57,
    },
    row7: {
        width: 125,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000000",
        borderRadius: 100,
        marginRight: 23,
    },
    row8: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 32,
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    text: {
        color: "#00000",
        fontSize: 20,
    },
    text2: {
        color: "#6F6CFF",
        fontSize: 20,
    },
    text3: {
        color: "#625F67",
        fontSize: 18,
        marginLeft: 1,
    },
    text4: {
        color: "#625F67",
        fontSize: 18,
    },
    text5: {
        color: "#7C7C7C",
        fontSize: 10,
        marginRight: 4,
        flex: 1,
    },
    text6: {
        color: "#7C7C7C",
        fontSize: 10,
        marginRight: 66,
    },
    text7: {
        color: "#7161FF",
        fontSize: 10,
        marginRight: 62,
    },
    text8: {
        color: "#7C7C7C",
        fontSize: 10,
        marginRight: 44,
    },
    text9: {
        color: "#7C7C7C",
        fontSize: 10,
    },
    text10: {
        color: "#FFFFFF",
        fontSize: 16,
        marginRight: 4,
        flex: 1,
    },
    text11: {
        color: "#FFFFFF",
        fontSize: 20,
        flex: 1,
    },
    view: {
        width: 25,
        borderColor: "#FFFFFF",
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 2,
        marginRight: 1,
    },
    scrollViewContent: {
      paddingBottom: 120, // 네비게이션 바와 겹치지 않게 여백 추가
    },

    //네비게이션 스타일
    column40: {
      backgroundColor: "#1D1B20",
      paddingTop: 28,
      paddingBottom: 8,
    },row90: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7,
      marginHorizontal: 29,
    },image60: {
      width: 27,
      height: 27,
    },row100: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 19,
      marginHorizontal: 22,
    },text100: {
      color: "#7C7C7C",
      fontSize: 10,
      marginRight: 4,
      flex: 1,
    },
    text110: {
      color: "#7C7C7C",
      fontSize: 10,
      marginRight: 66,
    },
    text120: {
      color: "#7161FF",
      fontSize: 10,
      marginRight: 62,
    },
    text130: {
      color: "#7C7C7C",
      fontSize: 10,
      marginRight: 44,
    },
    text140: {
      color: "#7C7C7C",
      fontSize: 10,
    },
    resultButton: {
      fontSize: 14,
      color: "#007bff",
      textDecorationLine: "underline",
    },
});
