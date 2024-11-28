import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native";
import React, { useState, useEffect } from 'react';
import { RouteProp,useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';


type BattleCreateSecondRouteProp = RouteProp<RootStackParamList, "BattleCreateSecond">;
type BattleCreateSecondNavigationProp = StackNavigationProp<RootStackParamList, 'BattleCreateSecond'>;
export default () => {
	const route = useRoute<BattleCreateSecondRouteProp>();
	const { inviteCode } = route.params; // 초대 코드 추출
	const navigation = useNavigation<BattleCreateSecondNavigationProp>(); // 타입 지정
	const [BattleDescription, setBattleDescription] = useState("");

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.column2}>
						{/* 초대 코드 표시 */}
						<View style={styles.row}>
							<Text style={styles.text}>{"초대 코드"}</Text>
							<Text style={styles.text2}>
								{inviteCode ? inviteCode : "불러오는 중..."}
							</Text>
						</View>
						<View style={styles.row2}>
							<Text style={styles.text3}>
								{"초대 코드 복사"}
							</Text>
							<View style={styles.box2}>
							</View>
							<Text style={styles.text4}>
								{"초대하기"}
							</Text>
						</View>
						<Text style={styles.text5}>
							{"설명"}
						</Text>
						<View style={styles.view}>
							<Text style={styles.textInput}>
								{"초대코드를 복사하고 상대방에게 전달하세요!"}
							</Text>
							
						</View>
						<View style={[styles.view2, { backgroundColor: "#6F6DFF" }]}>
								<TouchableOpacity onPress={() => navigation.navigate("BattleMain")}>
									<Text style={styles.text7}>
										{"확인"}
									</Text>
								</TouchableOpacity>
							</View>
						<View style={styles.column4}>
							<View style={styles.row3}>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image2}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image2}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image2}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image2}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image2}
								/>
							</View>
							<View style={styles.row4}>
								<Text style={styles.text8}>
									{"기록"}
								</Text>
								<Text style={styles.text9}>
									{"대결"}
								</Text>
								<Text style={styles.text10}>
									{"홈"}
								</Text>
								<Text style={styles.text11}>
									{"타이머"}
								</Text>
								<Text style={styles.text12}>
									{"운동메이트"}
								</Text>
							</View>
							<View style={styles.box3}>
							</View>
						</View>
					</View>
					<View style={styles.absoluteColumn}>
						<View style={styles.row5}>
							<Text style={styles.text13}>
								{"9:41"}
							</Text>
							<View style={styles.row6}>
								<View style={styles.box4}>
								</View>
								<View style={styles.box5}>
								</View>
							</View>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image3}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image4}
							/>
							<View style={styles.view3}>
								<View style={styles.box6}>
								</View>
							</View>
							<View style={styles.box7}>
							</View>
						</View>
						<View style={styles.row7}>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image5}
							/>
							<Text style={styles.text14}>
								{"대결 생성하기"}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

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
		paddingRight: 31,
	},
	// textInput 스타일 추가
	textInput: {
		height: 120, // 높이를 적절히 조정
		backgroundColor: "#625E67", // 배경 색상 설정
		borderRadius: 8,
		padding: 10,
		color: "#BABABA", // 텍스트 색상 설정
		fontSize: 16,
		textAlignVertical: 'top', // 멀티라인 텍스트가 위쪽에 정렬되도록 설정
	},
	box: {
		height: 2,
		backgroundColor: "#6F6CFF",
		marginHorizontal: 23,
	},
	box2: {
		width: 6,
		height: 16,
		backgroundColor: "#625F67",
		marginRight: 15,
	},
	box3: {
		height: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		marginHorizontal: 127,
	},
	box4: {
		width: 80,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box5: {
		width: 37,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box6: {
		height: 9,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		marginTop: 2,
	},
	box7: {
		width: 1,
		height: 4,
		backgroundColor: "#FFFFFF",
	},
	column: {
		marginTop: 1,
	},
	column2: {
		backgroundColor: "#1D1B20",
		paddingTop: 182,
	},
	column3: {
		marginBottom: 83,
		marginHorizontal: 24,
	},
	column4: {
		backgroundColor: "#1D1B20",
		paddingTop: 28,
		paddingBottom: 8,
	},
	image: {
		width: 24,
		height: 24,
	},
	image2: {
		width: 27,
		height: 27,
	},
	image3: {
		width: 18,
		height: 12,
		marginRight: 8,
	},
	image4: {
		width: 17,
		height: 11,
		marginRight: 8,
	},
	image5: {
		width: 9,
		height: 19,
		marginRight: 102,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		marginHorizontal: 24,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 58,
		marginHorizontal: 83,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 7,
		marginHorizontal: 29,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 19,
		marginHorizontal: 22,
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
		marginRight: 34,
	},
	text2: {
		color: "#6F6CFF",
		fontSize: 20,
		flex: 1,
	},
	text3: {
		color: "#625F67",
		fontSize: 16,
		marginRight: 20,
	},
	text4: {
		color: "#625F67",
		fontSize: 16,
		flex: 1,
	},
	text5: {
		color: "#FFFFFF",
		fontSize: 20,
		marginBottom: 11,
		marginLeft: 24,
	},
	text6: {
		color: "#BABABA",
		fontSize: 16,
	},
	text7: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	text8: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 4,
		flex: 1,
	},
	text9: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 66,
	},
	text10: {
		color: "#7161FF",
		fontSize: 10,
		marginRight: 62,
	},
	text11: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 44,
	},
	text12: {
		color: "#7C7C7C",
		fontSize: 10,
	},
	text13: {
		color: "#FFFFFF",
		fontSize: 16,
		marginRight: 4,
		flex: 1,
	},
	text14: {
		color: "#FFFFFF",
		fontSize: 20,
		flex: 1,
	},
	view: {
		backgroundColor: "#625E67",
		borderRadius: 8,
		paddingTop: 18,
		paddingBottom: 86,
		paddingHorizontal: 18,
		marginBottom: 48,
		marginHorizontal: 24,
	},
	view2: {
		alignItems: "center",
		backgroundColor: "#6F6CFF4D",
		borderRadius: 8,
		paddingVertical: 19,
		marginBottom: 10,
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
	steps: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20, // 단계 표시와 입력 필드 사이 간격
	},
	circle: {
		width: 24,
		height: 24,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepText: {
		color: 'white',
		fontSize: 12,
	},
	line: {
		width: 30,
		height: 2,
		backgroundColor: '#3a3a3a',
		marginHorizontal: 5,
	},
});