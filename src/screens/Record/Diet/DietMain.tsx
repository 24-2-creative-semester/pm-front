import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from "../../../navigations/types";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordTabSelector from "../../../components/RecordTabSelector";
import DateNavigator from "../../../components/datenavigator";
import HeaderLayout from "../../../components/HeaderLayout";

type DietMainNavigationProp = StackNavigationProp<RootStackParamList, 'DietMain'>;

type DietData = {
	targetCalories: number[];
	nowCalories: number[];
	morning: string[];
	lunch: string[];
	dinner: string[];
	snack: string[];
};

const DietMain: React.FC = () => {
	// 날짜 선택 버튼 핸들러

	const navigation = useNavigation<DietMainNavigationProp>();
	const [dietData, setDietData] = useState<any>(null);  // 서버에서 받아올 데이터 상태
	const [loading, setLoading] = useState(true);  // 데이터 로딩 상태
	const [error, setError] = useState<string | null>(null);  // 오류 상태
	const [selectedDate, setSelectedDate] = useState<string>(
		new Date(new Date().setHours(new Date().getHours() + 9)) // 한국 시간으로 설정
		  .toISOString()
		  .split("T")[0]
	  );

	// 날짜와 memberID 설정
	const inputtodayDate = new Date();
	inputtodayDate.setHours(inputtodayDate.getHours() + 9); // 한국 시간(KST)으로 맞추기
	const todayDate = inputtodayDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
	console.log("today", Date())

	// 서버에서 데이터 가져오는 함수
	const fetchDietData = async (date: string) => {
		try {
			setLoading(true);
			const accessToken = await AsyncStorage.getItem('accessToken');
			console.log(date);
			const response = await fetch(`http://172.16.86.241:8080/food/eatingByDate?date=${date}`, {
				method: 'GET',
				headers: {
					'Authorization': `${accessToken}` // 토큰을 Authorization 헤더에 추가
				}
			});

			if (!response.ok) {
				throw new Error("데이터를 가져오는 데 실패했습니다.");
			}
			const data = await response.json();
			console.log('checkDietMaindata', data);
			if (data.result) {
				setDietData(data.result);
			} else {
				console.log("데이터 없음");
				setDietData({
					morning: [],
					lunch: [],
					dinner: [],
					snack: [],
					nowCalories: [],
					targetCalories: []
				});
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);  // error가 Error 인스턴스일 때 메시지 처리
			} else {
				setError("알 수 없는 오류가 발생했습니다.");  // error가 Error 타입이 아닐 경우
			}
			console.error('Error:', error);
		} finally {
			setLoading(false);  // 로딩 상태 종료
		}
	};

	useEffect(() => {
		fetchDietData(selectedDate); // 날짜가 변경될 때마다 데이터 갱신
	  }, [selectedDate]);

	// 로딩 상태 처리
	if (loading) {
		return <Text>로딩 중...</Text>;
	}

	// 오류 상태 처리
	if (error) {
		return <Text>{error}</Text>;
	}

	return (
		<SafeAreaView style={styles.container}>
			<HeaderLayout
				selectedDate={selectedDate}
				onDateChange={(date) => setSelectedDate(date)}
			>
			<ScrollView style={styles.scrollView}>
				<View style={styles.column2}>
					
					<Text style={styles.text6}>
						{"오늘의 목표 달성률"}
					</Text>
					<View style={styles.row5}>
						<Text style={styles.text70}>
							{"●"}
						</Text>
						<Text style={styles.text7}>
							{" 탄수화물"}
						</Text>
						<Text style={styles.text71}>
							{"●"}
						</Text>
						<Text style={styles.text7}>
							{" 단백질"}
						</Text>
						<Text style={styles.text72}>
							{"●"}
						</Text>
						<Text style={styles.text8}>
							{" 지방"}
						</Text>
					</View>
					<View style={styles.view2}>
						<View
							style={[
								styles.box6,
								{
									width: `${Math.min((dietData?.nowCalories[0] / dietData?.targetCalories[0]) * 100, 100)}%`, // 비율 계산, 최대 100%
								},
							]}
						></View>
					</View>
					<Text style={styles.text9}>
						{dietData?.targetCalories[0] !== 0 ? ((dietData?.nowCalories[0] / dietData?.targetCalories[0]) * 100).toFixed(2) : "0.00"} %
					</Text>
					<View style={styles.view2}>
						<View
							style={[
								styles.box7,
								{
									width: `${Math.min((dietData?.nowCalories[1] / dietData?.targetCalories[1]) * 100, 100)}%`, // 비율 계산, 최대 100%
								},
							]}
						></View>
					</View>
					<Text style={styles.text9}>
						{dietData?.targetCalories[1] !== 0 ? ((dietData?.nowCalories[1] / dietData?.targetCalories[1]) * 100).toFixed(2) : "0.00"} %
					</Text>
					<View style={styles.view2}>
						<View
							style={[
								styles.box8,
								{
									width: `${Math.min((dietData?.nowCalories[2] / dietData?.targetCalories[2]) * 100, 100)}%`, // 비율 계산, 최대 100%
								},
							]}
						></View>
					</View>
					<Text style={styles.text10}>
						{dietData?.targetCalories[2] !== 0 ? ((dietData?.nowCalories[2] / dietData?.targetCalories[2]) * 100).toFixed(2) : "0.00"} %
					</Text>
					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"아침식사"}
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('DietSearch', { mealtime: 'MORNING' })} // 'morning' 전달
						>
							<Icon name="add-circle-outline" size={32} color="white" />
						</TouchableOpacity>
					</View>
					<View style={styles.row7}>
						<Text style={styles.text12}>
							{dietData?.morning?.length > 0
								? dietData.morning.map((item: string, index: number) => (
									<Text key={index}>{item}{"\n"}</Text>
								))
								: "데이터 없음"}						</Text>
						{/* <Icon name="close-outline" size={32} color="red" /> */}
					</View>



					{/* 점심식사 */}
					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"점심식사"}
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('DietSearch', { mealtime: 'LUNCH' })} // 'morning' 전달
						>
							<Icon name="add-circle-outline" size={32} color="white" />
						</TouchableOpacity>
					</View>
					<View style={styles.row7}>
						<Text style={styles.text12}>
							{dietData?.lunch?.length > 0
								? dietData.lunch.map((item: string, index: number) => (
									<Text key={index}>{item}{"\n"}</Text>
								))
								: "데이터 없음"}						</Text>
						{/* <Icon name="close-outline" size={32} color="red" /> */}
					</View>



					{/* 저녁식사 */}
					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"저녁식사"}
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('DietSearch', { mealtime: 'DINNER' })} // 'morning' 전달
						>
							<Icon name="add-circle-outline" size={32} color="white" />
						</TouchableOpacity>
					</View>
					<View style={styles.row7}>
						<Text style={styles.text12}>
							{dietData?.dinner?.length > 0
								? dietData.dinner.map((item: string, index: number) => (
									<Text key={index}>{item}{"\n"}</Text>
								))
								: "데이터 없음"}						</Text>
						{/* <Icon name="close-outline" size={32} color="red" /> */}
					</View>




					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"간식"}
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('DietSearch', { mealtime: 'SNACK' })} // 'morning' 전달
						>
							<Icon name="add-circle-outline" size={32} color="white" />
						</TouchableOpacity>
					</View>
					<View style={styles.row7}>
						<Text style={styles.text12}>
							{dietData?.snack?.length > 0
								? dietData.snack.map((item: string, index: number) => (
									<Text key={index}>{item}{"\n"}</Text>
								))
								: "데이터 없음"}						</Text>
						{/* <Icon name="close-outline" size={32} color="red" /> */}
					</View>

				</View>
			</ScrollView>
			</HeaderLayout>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	box: {
		width: 80,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box2: {
		width: 37,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box3: {
		height: 9,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		marginTop: 2,
	},
	box4: {
		width: 1,
		height: 4,
		backgroundColor: "#FFFFFF",
	},
	box6: {
		width: 10,
		height: 32,
		backgroundColor: "#6F6CFF",
		borderRadius: 4,
	},
	box7: {
		width: 258,
		height: 32,
		backgroundColor: "#D6FF0A",
		borderRadius: 4,
	},
	box8: {
		width: 155,
		height: 32,
		backgroundColor: "#69FFD7",
		borderRadius: 4,
	},
	box9: {
		height: 48,
		backgroundColor: "#B7B5BA",
		borderRadius: 8,
		marginBottom: 29,
		marginHorizontal: 24,
	},
	box10: {
		height: 48,
		backgroundColor: "#B7B5BA",
		borderRadius: 8,
		marginBottom: 18,
		marginHorizontal: 24,
	},
	box11: {
		height: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		marginHorizontal: 127,
	},
	column: {
		backgroundColor: "#1D1B20",
		paddingVertical: 11,
	},
	column2: {
		backgroundColor: "#1D1B20",
	},
	column3: {
		backgroundColor: "#1D1B20",
		paddingTop: 28,
		paddingBottom: 8,
	},
	image: {
		width: 18,
		height: 12,
		marginRight: 8,
	},
	image2: {
		width: 17,
		height: 11,
		marginRight: 8,
	},
	image3: {
		width: 8,
		height: 16,
	},
	image4: {
		width: 8,
		height: 8,
		marginRight: 11,
	},
	image5: {
		width: 20,
		height: 20,
	},
	image6: {
		width: 19,
		height: 19,
	},
	image7: {
		width: 27,
		height: 27,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 29,
		marginHorizontal: 33,
	},
	row2: {
		width: 125,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#000000",
		borderRadius: 100,
		marginRight: 23,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 32,
		marginHorizontal: 81,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 41,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 28,
		marginHorizontal: 32,
	},
	row6: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 22,
		marginHorizontal: 24,
	},
	row7: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#B7B5BA",
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 13,
		marginBottom: 29,
		marginHorizontal: 24,
	},
	row8: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 7,
		marginHorizontal: 29,
	},
	row9: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 19,
		marginHorizontal: 21,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#1D1B20",
	},
	text: {
		color: "#FFFFFF",
		fontSize: 16,
		marginRight: 4,
		flex: 1,
	},
	text2: {
		color: "#FFFFFF",
		fontSize: 28,
	},
	text3: {
		color: "#6F6CFF",
		fontSize: 18,
		marginRight: 34,
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 18,
		marginRight: 27,
	},
	text5: {
		color: "#FFFFFF",
		fontSize: 18,
		flex: 1,
	},
	text6: {
		color: "#FFFFFF",
		fontSize: 20,
		marginBottom: 19,
		marginLeft: 25,
	},
	text7: {
		color: "#FFFFFF",
		fontSize: 14,
		marginRight: 26,
	},
	text8: {
		color: "#FFFFFF",
		fontSize: 14,
		flex: 1,
	},
	text9: {
		color: "#BABABA",
		fontSize: 14,
		marginBottom: 13,
		marginLeft: 25,
	},
	text10: {
		color: "#BABABA",
		fontSize: 14,
		marginBottom: 31,
		marginLeft: 25,
	},
	text11: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	text12: {
		color: "#000000",
		fontSize: 18,
	},
	text13: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 4,
		flex: 1,
	},
	text14: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 66,
	},
	text15: {
		color: "#7161FF",
		fontSize: 10,
		marginRight: 62,
	},
	text16: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 44,
	},
	text17: {
		color: "#7C7C7C",
		fontSize: 10,
	},
	view: {
		width: 25,
		borderColor: "#FFFFFF",
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 2,
		marginRight: 1,
	},
	view2: {
		backgroundColor: "#625F67",
		borderRadius: 4,
		marginBottom: 9,
		marginHorizontal: 24,
	},
	text70: {
		color: "#6F6CFF",
		fontSize: 14,
	},
	text71: {
		color: "#D6FF0A",
		fontSize: 14,
	},
	text72: {
		color: "#69FFD7",
		fontSize: 14,
	},
	row600:{
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		//marginBottom: 22,
		marginHorizontal: 24,
		flex: 1, 
	}
});

export default DietMain;