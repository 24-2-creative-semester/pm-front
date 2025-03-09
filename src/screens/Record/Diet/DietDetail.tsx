import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../../navigations/types";// RootStackParamList를 불러옵니다.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type DietDetailRouteProp = RouteProp<RootStackParamList, 'DietDetail'>; // 올바른 타입 정의
type DietDetailNavigationProp = StackNavigationProp<RootStackParamList, 'DietDetail'>;

export default () => {
	const [quantity, setQuantity] = useState(1); // 수량 기본값 1
	const navigation = useNavigation<DietDetailNavigationProp>();
	const increaseQuantity = () => setQuantity((prev) => prev + 1); // 수량 증가
	const decreaseQuantity = () =>
		setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // 수량 감소 (최소값 1)

	const route = useRoute<DietDetailRouteProp>(); // route에 타입 지정
	const { foodid, mealtime } = route.params; // 'foodid'와 'mealtime'을 제대로 받아옴

	const [foodDetails, setFoodDetails] = useState({
		foodName: '',
		foodCalories: 0,
		manufacturingCompany: '',
		protein: 0,
		carbohydrate: 0,
		fat: 0,
		dietaryFiber: 0,
		sodium: 0,
		sugar: 0
	});

	const [loading, setLoading] = useState(true);

	// foodId를 사용해 GET 방식으로 서버에서 데이터 요청
	const fetchFoodDetails = async () => {
		try {
			const response = await fetch(`/food/search?foodId=${foodid}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log('Response Data:', data);

			setFoodDetails(data.result); // result만 상태로 설정
		} catch (error) {
			console.error("Failed to fetch food details:", error);
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		fetchFoodDetails();
	}, []);


	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.text}>Loading...</Text>
			</SafeAreaView>
		);
	}

	const handleAddToServer = async () => {
		const accessToken = await AsyncStorage.getItem('accessToken');


		try {
			// 서버로 POST 요청 보내기
			const response = await fetch('/food/addEatingFood', {
				method: 'POST',
				headers: {
					'Authorization': `${accessToken}`, // Authorization 헤더 추가
					'Content-Type': 'application/json', // JSON 형식 명시
				},
				body: JSON.stringify({
					foodId: foodid,       // 서버에서 요구하는 Key 값
					eatingAmount: quantity,
					foodTime: mealtime,
				}),
			});

			// 응답 확인
			if (response.ok) {
				console.log('Data successfully sent to server');
				// 서버로 데이터 전송 성공 시 DietMain 화면으로 이동
				navigation.navigate('DietMain'); // 화면 이동
			} else {
				throw new Error(`Failed to add data: ${response.status}`);
			}
		} catch (error) {
			console.error('Error while sending data to server:', error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
				<View style={styles.column}>

					<View style={styles.row3}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => navigation.goBack()}
						>
							<Text style={styles.backButtonText}>←</Text>
						</TouchableOpacity>
						<Text style={styles.text20}>{"상세정보"}</Text>
					</View>
				</View>
				<View style={styles.column2}>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{foodDetails.foodName}
						</Text>

						<TouchableOpacity
							style={styles.view2}
							onPress={handleAddToServer} // 추가 버튼을 눌렀을 때 POST 요청
						>
							<Text style={styles.text4}>추가</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text5}>
							{"수량"}
						</Text>
						<TouchableOpacity onPress={decreaseQuantity}>
							<Icon name="remove-circle-outline" size={32} color="white" />
						</TouchableOpacity>
						<Text style={styles.text6}>{quantity}</Text>
						<TouchableOpacity onPress={increaseQuantity}>
							<Icon name="add-circle-outline" size={32} color="white" />
						</TouchableOpacity>
					</View>
					<View style={styles.row6}>
						<Text style={styles.text7}>
							{"단위"}
						</Text>
						<View style={styles.view3}>
							<Text style={styles.text7}>
								{"100g"}
							</Text>
						</View>
					</View>
					<View style={styles.column3}>
						<View style={styles.row7}>
							<Text style={styles.text8}>{"칼로리"}</Text>
							<Text style={styles.text9}>
								{foodDetails.foodCalories
									? Number.isInteger(foodDetails.foodCalories)
										? foodDetails.foodCalories
										: foodDetails.foodCalories.toFixed(2)
									: "0"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>{"단백질"}</Text>
							<Text style={styles.text9}>
								{foodDetails.protein
									? Number.isInteger(foodDetails.protein)
										? foodDetails.protein
										: foodDetails.protein.toFixed(2)
									: "0"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>{"지방"}</Text>
							<Text style={styles.text9}>
								{foodDetails.fat
									? Number.isInteger(foodDetails.fat)
										? foodDetails.fat
										: foodDetails.fat.toFixed(2)
									: "0"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>{"탄수화물"}</Text>
							<Text style={styles.text9}>
								{foodDetails.carbohydrate
									? Number.isInteger(foodDetails.carbohydrate)
										? foodDetails.carbohydrate
										: foodDetails.carbohydrate.toFixed(2)
									: "0"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>{"식이섬유"}</Text>
							<Text style={styles.text9}>
								{foodDetails.dietaryFiber
									? Number.isInteger(foodDetails.dietaryFiber)
										? foodDetails.dietaryFiber
										: foodDetails.dietaryFiber.toFixed(2)
									: "0"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>{"나트륨"}</Text>
							<Text style={styles.text9}>
								{foodDetails.sodium
									? Number.isInteger(foodDetails.sodium)
										? foodDetails.sodium
										: foodDetails.sodium.toFixed(2)
									: "0"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>{"당류"}</Text>
							<Text style={styles.text9}>
								{foodDetails.sugar
									? Number.isInteger(foodDetails.sugar)
										? foodDetails.sugar
										: foodDetails.sugar.toFixed(2)
									: "0"}
							</Text>
						</View>
						<View style={styles.row8}>
							<Text style={styles.text8}>{"제조회사"}</Text>
							<Text style={styles.text9}>
								{foodDetails.manufacturingCompany || "N/A"}
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
		backgroundColor: "#1D1B20",
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
	box5: {
		height: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		marginHorizontal: 127,
	},
	column: {
		backgroundColor: "#1D1B20",
		paddingTop: 11,
		paddingBottom: 29,
		paddingRight: 31,
	},
	column2: {
		backgroundColor: "#1D1B20",
		paddingTop: 53,
	},
	column3: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		paddingVertical: 26,
		paddingHorizontal: 25,
		marginBottom: 66,
		marginHorizontal: 32,
	},
	column4: {
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
		width: 9,
		height: 19,
		marginRight: 121,
	},
	image4: {
		width: 24,
		height: 24,
		marginRight: 16,
	},
	image5: {
		width: 24,
		height: 24,
	},
	image6: {
		width: 27,
		height: 27,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 37,
		marginLeft: 56,
	},
	row2: {
		width: 125,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#000000",
		borderRadius: 100,
		marginRight: 22,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 31,
	},
	row4: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 62,
		marginHorizontal: 32,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
		marginHorizontal: 32,
	},
	row6: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 48,
		marginHorizontal: 32,
	},
	row7: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	row8: {
		flexDirection: "row",
		alignItems: "center",
	},
	row9: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 7,
		marginHorizontal: 29,
	},
	row10: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 19,
		marginHorizontal: 22,
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
		fontSize: 20,
		flex: 1,
	},
	text3: {
		color: "#FFFFFF",
		fontSize: 28,
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 18,
	},
	text5: {
		color: "#FFF",
		fontSize: 20,
		marginRight: 4,
		flex: 1,
	},
	text6: {
		color: "#FFFFFF",
		fontSize: 20,
		marginRight: 20,
		marginLeft: 20,
	},
	text7: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	text8: {
		color: "#000000",
		fontSize: 18,
		marginRight: 4,
		flex: 1,
	},
	text9: {
		color: "#6F6CFF",
		fontSize: 18,
	},
	text10: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 4,
		flex: 1,
	},
	text11: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 66,
	},
	text12: {
		color: "#7161FF",
		fontSize: 10,
		marginRight: 62,
	},
	text13: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 44,
	},
	text14: {
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
		width: 82,
		alignItems: "center",
		backgroundColor: "#6F6CFF",
		borderRadius: 8,
		paddingVertical: 10,
	},
	view3: {
		width: 89,
		backgroundColor: "#625F67",
		borderRadius: 8,
		paddingTop: 10,
		paddingBottom: 10,	
		paddingLeft: 22,
		paddingRight: 10,
	},
	text20: {
		flex: 1, // 텍스트가 가운데 배치될 수 있도록 flex 설정
		textAlign: "center", // 텍스트를 중앙 정렬
		fontSize: 18,
		color: "#1D1B20",
		fontWeight: "bold",
	}, backButton: {
		position: "absolute",

		left: -5,	
		zIndex: 1,
	},
	backButtonText: {
		color: "#FFF",
		fontSize: 18,
		fontWeight: "bold",
	},
	scrollContent: {
		flexGrow: 1, // 스크롤 콘텐츠가 화면 높이를 채우도록 설정
		justifyContent: "space-between", // 위아래 여백 적절히 조정
	  },
});