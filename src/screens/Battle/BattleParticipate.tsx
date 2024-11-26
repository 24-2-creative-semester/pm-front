import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

const BattleParticipate = () => {
	const [inviteCode, setInviteCode] = useState('');
	const [targetWeight, setTargetWeight] = useState('');


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
			const response = await fetch('http://172.16.4.171:8080/acceptbattle', {
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
						<TouchableOpacity style={[styles.view2, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
							onPress={handleParticipate}
							disabled={!isButtonEnabled}
						>
							<Text style={styles.text}>{"참가하기"}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.column3}>
						<View style={styles.row3}>
							{Array(5).fill(null).map((_, index) => (
								<Image
									key={index}
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image}
								/>
							))}
						</View>
						<View style={styles.row4}>
							<Text style={styles.text3}>{"기록"}</Text>
							<Text style={styles.text4}>{"대결"}</Text>
							<Text style={styles.text5}>{"홈"}</Text>
							<Text style={styles.text6}>{"타이머"}</Text>
							<Text style={styles.text7}>{"운동메이트"}</Text>
						</View>
						<View style={styles.box2}></View>
					</View>
				</View>
				<View style={styles.absoluteColumn}>
					<View style={styles.row5}>
						<Text style={styles.text8}>{"9:41"}</Text>
						<View style={styles.row6}>
							<View style={styles.box3}></View>
							<View style={styles.box4}></View>
						</View>
						<Image source={{ uri: "https://i.imgur.com/1tMFzp8.png" }} resizeMode={"stretch"} style={styles.image2} />
						<Image source={{ uri: "https://i.imgur.com/1tMFzp8.png" }} resizeMode={"stretch"} style={styles.image3} />
						<View style={styles.view3}>
							<View style={styles.box5}></View>
						</View>
						<View style={styles.box6}></View>
					</View>
					<View style={styles.row7}>
						<Image source={{ uri: "https://i.imgur.com/1tMFzp8.png" }} resizeMode={"stretch"} style={styles.image4} />
						<Text style={styles.text9}>{"대결 참가하기"}</Text>
					</View>

				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default BattleParticipate;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	input: {
		height: 40,
		color: '#000',
		borderRadius: 8, // Optional for rounded corners
		paddingHorizontal: 10, // Optional for padding inside the input
		backgroundColor: '#f0f0f0', // Optional for background color
	},
	absoluteColumn: {
		position: "absolute",
		top: -1,
		right: 0,
		left: 0,
		height: 135,
		backgroundColor: "#1D1B20",
		paddingRight: 31,
	},
	box: {
		width: 210,
		height: 48,
		backgroundColor: "#625E67",
		borderRadius: 8,
	},
	box2: {
		height: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		marginHorizontal: 127,
	},
	box3: {
		width: 80,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box4: {
		width: 37,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box5: {
		height: 9,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		marginTop: 2,
	},
	box6: {
		width: 1,
		height: 4,
		backgroundColor: "#FFFFFF",
	},
	column: {
		marginTop: 1,
	},
	column2: {
		backgroundColor: "#1D1B20",
		paddingTop: 314,
	},
	column3: {
		backgroundColor: "#1D1B20",
		paddingTop: 24,
		paddingBottom: 8,
	},
	image: {
		width: 30,
		height: 30,
	},
	image2: {
		width: 18,
		height: 12,
		marginRight: 8,
	},
	image3: {
		width: 17,
		height: 11,
		marginRight: 8,
	},
	image4: {
		width: 9,
		height: 19,
		marginRight: 102,
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
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 9,
		marginHorizontal: 24,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 17,
		marginHorizontal: 19,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 11,
		marginBottom: 37,
		marginLeft: 56,
	},
	row6: {
		width: 125,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#000000",
		borderRadius: 100,
		marginRight: 22,
	},
	row7: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 31,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	text2: {
		color: "#FFFFFF",
		fontSize: 16,
	},
	text3: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 4,
		flex: 1,
	},
	text4: {
		color: "#6F6CFF",
		fontSize: 10,
		marginRight: 69,
	},
	text5: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 63,
	},
	text6: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 46,
	},
	text7: {
		color: "#7C7C7C",
		fontSize: 10,
	},
	text8: {
		color: "#FFFFFF",
		fontSize: 16,
		marginRight: 4,
		flex: 1,
	},
	text9: {
		color: "#FFFFFF",
		fontSize: 20,
		flex: 1,
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
	view3: {
		width: 25,
		borderColor: "#FFFFFF",
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 2,
		marginRight: 1,
	},
	buttonDisabled: {
		backgroundColor: '#4a4a4a',
	  },
	  buttonEnabled: {
		backgroundColor: '#7c77ff',
	  },
});