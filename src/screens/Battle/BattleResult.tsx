import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API에서 받아올 데이터 타입 정의
interface BattleResult {
  memberName: string;
  memberState: string;
  opponentName: string;
  opponentState: string;
  phrase: string;
}

const BattleResultScreen = ({ route }: any) => {
  const { battleId } = route.params; // route.params로 battleId 받아오기
  const [result, setResult] = useState<BattleResult | null>(null);

  // BattleResult API 호출
  const fetchBattleResult = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await fetch(
        `http://172.16.86.241:8080/battleresult?battleId=${battleId}`, // battleId 동적 문자열 처리
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`, // 토큰 추가
          },
        }
      );

      const data = await response.json();
      if (data.isSuccess) {
        setResult(data.result); // 결과 상태 업데이트
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching battle result:", error);
    }
  };

  // 데이터 로드
  useEffect(() => {
    fetchBattleResult(); // 비동기 함수 호출
  }, [battleId]);

  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>결과를 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        {result.memberState === "WINNER" ? "대결에서 이겼어요!" : "대결에서 졌어요!"}
      </Text>
      <Text style={styles.congratsText}>
        {result.memberState === "WINNER" ? "축하해요!" : "다음에 더 잘 할 수 있어요!"}
      </Text>

      <View style={styles.resultContainer}>
        {/* 승리자 카드 */}
        <View style={[styles.resultCard, styles.winnerCard]}>
          <Text style={styles.nameText}>{result.memberName}</Text>
          <Text style={styles.resultText}>{result.memberState === "WINNER" ? "WIN" : "LOSE"}</Text>
        </View>

        {/* 가운데 번개 모양 */}
        <Text style={styles.versusIcon}>⚡</Text>

        {/* 패배자 카드 */}
        <View style={[styles.resultCard, styles.loserCard]}>
          <Text style={styles.nameText}>{result.opponentName}</Text>
          <Text style={styles.resultText}>{result.opponentState === "LOSER" ? "LOSE" : "WIN"}</Text>
        </View>
      </View>

      {/* 하단 텍스트 */}
      <Text style={styles.footerText}>{result.phrase}</Text>
    </SafeAreaView>
  );
};

export default BattleResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#6F6CFF",
    fontSize: 16,
    marginBottom: 10,
  },
  congratsText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  resultContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  resultCard: {
    width: 120,
    height: 100,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // 카드 사이 간격 조정
  },
  winnerCard: {
    backgroundColor: "#6F6CFF",
  },
  loserCard: {
    backgroundColor: "#625E67",
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  resultText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  versusIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    marginVertical: 10, // 번개 모양 간격 조정
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 20,
  },
});
