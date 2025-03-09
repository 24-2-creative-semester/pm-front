import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BattleOtherState = ({ route }: { route: any }) => {
  const { battleId } = route.params;
  const navigation = useNavigation();

  const [battleData, setBattleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchBattleData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      try {
        const response = await fetch(
          `/battlestatus?battleId=${battleId}`,
          {
            method: "GET",
            headers: { Authorization: `${accessToken}` },
          }
        );
        const data = await response.json();
		console.log("opponent ID 받아오니?",data);
        if (data.isSuccess) {
          setBattleData(data.result);
        } else {
          console.error("API 요청 실패:", data.message);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBattleData();
  }, []);

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
      </SafeAreaView>
    );
  }

  if (!battleData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>데이터를 가져오지 못했습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>대결 상태</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.daysLeft}>
          {calculateDays(today, battleData.targetDay) > 0
            ? `D-${calculateDays(today, battleData.targetDay)}`
            : "일정 만료"}
        </Text>

        {/* 본인 카드 */}
        <View style={styles.card}>
          <Text style={styles.name}>{battleData.member1Name}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                { width: `${Math.min(battleData.member1AttainmentRate, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.percentage}>
            {battleData.member1AttainmentRate}%
          </Text>
          <View style={styles.weights}>
            <View>
              <Text style={styles.label}>시작 몸무게</Text>
              <Text style={styles.value}>
                {battleData.member1StartWeight}kg
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.label}>목표 몸무게</Text>
              <Text style={styles.value}>
                {battleData.member1TargetWeight}kg
              </Text>
            </View>
            <Image
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC",
              }}
              style={styles.profile}
            />
          </View>
        </View>

		<View style={styles.versusContainer}>
  <Text style={styles.versusIcon}>⚡</Text>
</View>

        {/* 상대방 카드 */}
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BattleOpponentDiet", {
                opponentid: battleData.opponentId,
              })
            }
          >
            <Text style={styles.name}>{battleData.member2Name}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${Math.min(battleData.member2AttainmentRate, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.percentage}>
              {battleData.member2AttainmentRate}%
            </Text>
            <View style={styles.weights}>
              <View>
                <Text style={styles.label}>시작 몸무게</Text>
                <Text style={styles.value}>
                  {battleData.member2StartWeight}kg
                </Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.label}>목표 몸무게</Text>
                <Text style={styles.value}>
                  {battleData.member2TargetWeight}kg
                </Text>
              </View>
              <Image
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC",
                }}
                style={styles.profile}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#1D1B20",
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 20,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  daysLeft: {
    color: "#FFF",
    fontSize: 36,
    textAlign: "left",
    marginBottom: 20,
	marginTop:60,
  },
  card: {
    backgroundColor: "#6F6CFF",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  name: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progress: {
    height: "100%",
    backgroundColor: "#FFF",
  },
  percentage: {
    color: "#FFF",
    textAlign: "right",
  },
  weights: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  label: {
    color: "#FFF",
    fontSize: 20,
  },
  value: {
    color: "#FFF",
    fontSize: 20,
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: "auto",
  },
  versusContainer: {
    flex: 1, // 부모 컨테이너가 전체 화면을 차지하도록 설정
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 가로 중앙 정렬
  },
  versusIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    marginVertical: 10, // 번개 모양 간격 조정
	marginBottom:30,
  },
});

export default BattleOtherState;
