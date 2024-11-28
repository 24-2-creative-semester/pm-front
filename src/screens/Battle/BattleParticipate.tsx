import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/types';

type BattleCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BattleParticipate'>;

const BattleParticipate = () => {
	const [inviteCode, setInviteCode] = useState('');
	const [targetWeight, setTargetWeight] = useState('');
	const navigation = useNavigation<BattleCreateScreenNavigationProp>();


// 버튼 활성화 여부 확인: 두 입력값 모두 존재하면 활성화
const isButtonEnabled = inviteCode !== '' && targetWeight !== '';

const handleParticipate = async () => {
	// 초대 코드와 목표 몸무게가 입력되었을 때만 서버로 요청
	if (inviteCode && targetWeight) {
		// 요청할 데이터 생성
		const data = {
			inviteCode: inviteCode, // 초대 코드 (숫자로 변환)
			member2Id: 2, // 실제 ID 값을 사용하세요
			member2TargetWeight: parseFloat(targetWeight), // 목표 몸무게
		};

		try {
			// 서버로 POST 요청 보내기
			const response = await fetch('http://172.16.86.241:8080/acceptbattle', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data), // data를 JSON 문자열로 변환하여 보내기
			});

			console.log("Response:", response);
     		console.log("Data:", data);
      


			if (response.ok) {
				// 요청 성공 시
				Alert.alert("참가 완료", "대결에 성공적으로 참가했습니다.");
			} else {
				// 요청 실패 시
				Alert.alert("오류", "대결 참가에 실패했습니다.");
			}
		} catch (error) {
			// 서버 요청 중 오류 발생 시
			Alert.alert("오류", "서버 요청 중 문제가 발생했습니다.");
		}
	} else {
		Alert.alert("오류", "초대 코드와 목표 몸무게를 입력해주세요.");
	}
};

return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('BattleMain')}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>대결 참가하기</Text>
            </View>
            <View style={styles.column}>
                <View style={styles.column2}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{"초대 코드"}</Text>

                        <TextInput
                            style={styles.view}
                            placeholder="초대 코드를 입력하세요"
                            placeholderTextColor="#555"
                            value={inviteCode}
                            onChangeText={setInviteCode}
                        />
                    </View>
                    <View style={styles.row2}>
                        <Text style={styles.text}>{"목표 몸무게"}</Text>

                        <TextInput
                            style={styles.view}
                            placeholder="목표 몸무게 입력"
                            placeholderTextColor="#555"
                            value={targetWeight}
                            onChangeText={setTargetWeight}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.view2,
                            isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled,
                        ]}
                        onPress={handleParticipate}
                        disabled={!isButtonEnabled}
                    >
                        <Text style={styles.text}>{"참가하기"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Ensures proper alignment
        backgroundColor: "#1D1B20",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        position: "absolute",
        left: 20,
    },
    backButtonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        flex: 1, // Ensures the title is centered
        textAlign: "center",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    column: {
        marginTop: 1,
    },
    column2: {
        backgroundColor: "#1D1B20",
        paddingTop: 314,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        marginHorizontal: 24,
    },
    row2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 166,
        marginHorizontal: 24,
    },
    view: {
        width: 210,
        backgroundColor: "#625E67",
        borderRadius: 8,
        paddingVertical: 17,
        paddingHorizontal: 14,
    },
    view2: {
        alignItems: "center",
        backgroundColor: "#6F6CFF4D",
        borderRadius: 8,
        paddingVertical: 19,
        marginBottom: 91,
        marginHorizontal: 24,
    },
    buttonDisabled: {
        backgroundColor: '#4a4a4a',
    },
    buttonEnabled: {
        backgroundColor: '#7c77ff',
    },
    text: {
        color: "#FFFFFF",
        fontSize: 20,
    },
});

export default BattleParticipate;