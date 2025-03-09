import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../../navigations/types";// RootStackParamList를 불러옵니다.
import { useRoute, RouteProp,useNavigation } from '@react-navigation/native';

type DietEnrollRouteProp = RouteProp<RootStackParamList, 'DietEnroll'>; // 올바른 타입 정의
type DietEnrollNavigationProp = StackNavigationProp<RootStackParamList, 'DietEnroll'>;

type DietEnrollProps = {
	route: DietEnrollRouteProp;
  };
   
  const DietEnroll = ({ route }: DietEnrollProps) => {
	const { mealtime } = route.params;  // 'mealtime' 값을 받음
	const navigation = useNavigation<DietEnrollNavigationProp>();
	const [foodName, Setfoodname] = useState('');
	const [foodweight, Setfoodweight] = useState('');
	const [foodCalories, Setfoodkcal] = useState('');
	const [protein, Setfoodprotein] = useState('');
	const [carbohydrate, SetfoodCarbohydrate] = useState('');
	const [fat, Setfoodfat] = useState('');
	const [dietaryFiber, Setfooddietaryfiber] = useState('');
	const [sodium, SetfoodSodium] = useState('');
	const [sugar, Setfoodsugar] = useState('');
	const [manufacturingCompany, setmanufacturingCompany] = useState('');

	
	const weight = parseFloat(foodweight);

    // 입력된 중량으로 나누기
    const getCalculatedValue = (value: string) => {
        const numericValue = parseFloat(value);
        return isNaN(numericValue) || isNaN(weight) || weight === 0 ? 0 : numericValue / weight * 100;
    };

	// 버튼 비활성화 조건: 모든 입력 필드가 비어있는 경우
	const isButtonDisabled =
		!foodName && !foodweight && !foodCalories && !protein && !carbohydrate && !fat && !dietaryFiber && !sodium && !sugar;

		const sendDataToServer = async () => {
			const url = '/food/addFood'; // 여기에 API 엔드포인트 URL 입력
			const payload = {
				foodName,
				manufacturingCompany,
				foodCalories: getCalculatedValue(foodCalories),
				protein: getCalculatedValue(protein),
				carbohydrate: getCalculatedValue(carbohydrate),
				fat: getCalculatedValue(fat),
				dietaryFiber: getCalculatedValue(dietaryFiber),
				sodium: getCalculatedValue(sodium),
				sugar: getCalculatedValue(sugar),
			};
		
			// 보내는 데이터 로그 출력 (서버에 보내기 전에)
			console.log("Sending data to server:", JSON.stringify(payload));
		
			try {
				const accessToken = await AsyncStorage.getItem('accessToken');
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `${accessToken}`, // 토큰을 Authorization 헤더에 추가
						'Content-Type': 'application/json', // JSON 형식의 데이터를 보내기 위해 헤더 추가
					},
					body: JSON.stringify(payload),
				});
		
				// 서버 응답이 실패한 경우
				if (!response.ok) {
					const errorText = await response.text(); // 응답 본문을 텍스트로 읽어봄
					console.error(`서버 응답 오류: ${response.status}`);
					console.error('응답 본문:', errorText); // 응답 본문을 확인
					throw new Error(`서버 응답 오류: ${response.status}`);
				}
		
				// 응답을 JSON으로 파싱하여 로그에 출력
				const data = await response.json();
				console.log("DietEnroll response", data);  // 응답 데이터 로그로 확인
		
				// 서버 응답 성공 시 DietSearch 화면으로 이동
				navigation.navigate('DietSearch', { mealtime: mealtime });  // 'DietSearch'는 React Navigation에 등록된 화면 이름
			} catch (error) {
				console.error('데이터 전송 실패:', error);
			}
		};
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.row3}>
						<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
							<Text style={styles.backButtonText}>←</Text>
						</TouchableOpacity>
						<Text style={styles.text2}>
							{"음식 등록"}
						</Text>
					</View>
				</View>
				<View style={styles.column2}>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"이름"}
						</Text>
						<TextInput
							style={styles.box5}
							value={foodName}
							onChangeText={Setfoodname}
							placeholder="음식 이름 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"제조회사"}
						</Text>
						<TextInput
							style={styles.box5}
							value={manufacturingCompany}
							onChangeText={setmanufacturingCompany}
							keyboardType="numeric"
							placeholder="회사 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"중량 (g)"}
						</Text>
						<TextInput
							style={styles.box5}
							value={foodweight}
							onChangeText={Setfoodweight}
							keyboardType="numeric"
							placeholder="중량 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"칼로리 (kcal)"}
						</Text>
						<TextInput
							style={styles.box5}
							value={foodCalories}
							onChangeText={Setfoodkcal}
							keyboardType="numeric"
							placeholder="칼로리 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"단백질 (g)"}
						</Text>
						<TextInput
							style={styles.box5}
							value={protein}
							onChangeText={Setfoodprotein}
							keyboardType="numeric"
							placeholder="단백질 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"탄수화물 (g)"}
						</Text>
						<TextInput
							style={styles.box5}
							value={carbohydrate}
							onChangeText={SetfoodCarbohydrate}
							keyboardType="numeric"
							placeholder="탄수화물 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"지방 (g)"}
						</Text>

						<TextInput
							style={styles.box5}
							value={fat}
							onChangeText={Setfoodfat}
							keyboardType="numeric"
							placeholder="지방 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"식이섬유 (g)"}
						</Text>

						<TextInput
							style={styles.box5}
							value={dietaryFiber}
							onChangeText={Setfooddietaryfiber}
							keyboardType="numeric"
							placeholder="식이섬유 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"나트륨 (mg)"}
						</Text>

						<TextInput
							style={styles.box5}
							value={sodium}
							onChangeText={SetfoodSodium}
							keyboardType="numeric"
							placeholder="나트륨 입력"
						/>

					</View>
					<View style={styles.row5}>
						<Text style={styles.text3}>
							{"당 (g)"}
						</Text>
						<TextInput
							style={styles.box5}
							value={sugar}
							onChangeText={Setfoodsugar}
							keyboardType="numeric"
							placeholder="당 입력"
						/>

					</View>

					<TouchableOpacity
						style={[
							styles.button,
							isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled,
						]}
						disabled={isButtonDisabled}
						onPress={sendDataToServer}>

						<Text style={styles.buttonText}>완료</Text>
					</TouchableOpacity>


					
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
	backButton: {
		position: "absolute", // 백버튼을 독립적으로 배치
		left: 20, // 왼쪽 여백 설정
		top: 15, // 위쪽 여백 설정
		zIndex: 1, // 백버튼이 텍스트 위에 렌더링되지 않도록 보장
	},
	  backButtonText: {
		color: "#FFF",
		fontSize: 30,
		fontWeight: "bold",
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
		width: 210,
		height: 48,
		backgroundColor: "#625E67",
		borderRadius: 8,
	},
	box6: {
		height: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		marginHorizontal: 127,
	},
	column: {
		backgroundColor: "#1D1B20",
		paddingTop: 11,
		// paddingBottom: 29,
		paddingRight: 31,
	},
	column2: {
		backgroundColor: "#1D1B20",
		paddingTop: 44,
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
		width: 9,
		height: 19,
		marginRight: 119,
	},
	image4: {
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
		position: "relative", // 백버튼과 텍스트를 독립적으로 배치하기 위해 상대 위치 설정
		alignItems: "center", // 텍스트를 세로 가운데 정렬
		justifyContent: "center", // 텍스트를 가로 가운데 정렬
		paddingVertical: 15, // 상하 패딩 추가
		backgroundColor: "#1D1B20", // 배경색 설정 (필요시 제거 가능)
	},
	row4: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
		marginHorizontal: 24,
	},
	row5: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 32,
		marginHorizontal: 24,
	},
	row6: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 7,
		marginHorizontal: 29,
	},
	row7: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 19,
		marginHorizontal: 22,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
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
		fontWeight: "bold",
		textAlign: "center", // 텍스트를 중앙 정렬
	},	
	text3: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	text4: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 4,
		flex: 1,
	},
	text5: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 66,
	},
	text6: {
		color: "#7161FF",
		fontSize: 10,
		marginRight: 62,
	},
	text7: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 44,
	},
	text8: {
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
		alignItems: "center",
		backgroundColor: "#6F6CFF4D",
		borderRadius: 8,
		paddingVertical: 19,
		marginBottom: 18,
		marginHorizontal: 24,
	},
	button: {
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonDisabled: {
		backgroundColor: '#4a4a4a',
	},
	buttonEnabled: {
		backgroundColor: '#7c77ff',
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 18,
	},
});

export default DietEnroll;