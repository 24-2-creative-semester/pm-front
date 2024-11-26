import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
export default () => {

	const [name, Setfoodname] = useState('');
	const [weight, Setfoodweight] = useState('');
	const [kcal, Setfoodkcal] = useState('');
	const [protein, Setfoodprotein] = useState('');
	const [Carbohydrate, SetfoodCarbohydrate] = useState('');
	const [fat, Setfoodfat] = useState('');
	const [dietaryfiber, Setfooddietaryfiber] = useState('');
	const [Sodium, SetfoodSodium] = useState('');
	const [sugar, Setfoodsugar] = useState('');


	// 버튼 비활성화 조건: 모든 입력 필드가 비어있는 경우
	const isButtonDisabled =
		!name && !weight && !kcal && !protein && !Carbohydrate && !fat && !dietaryfiber && !Sodium && !sugar;

	const sendDataToServer = () => {
		// 서버로 데이터 전송하는 로직 추가
		console.log("데이터 전송:", {
			name,
			weight,
			kcal,
			protein,
			Carbohydrate,
			fat,
			dietaryfiber,
			Sodium,
			sugar,
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.row}>
						<Text style={styles.text}>
							{"9:41"}
						</Text>
						<View style={styles.row2}>
							<View style={styles.box}>
							</View>
							<View style={styles.box2}>
							</View>
						</View>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image}
						/>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image2}
						/>
						<View style={styles.view}>
							<View style={styles.box3}>
							</View>
						</View>
						<View style={styles.box4}>
						</View>
					</View>
					<View style={styles.row3}>
						<Icon name="chevron-back-outline" size={26} color="red" style={styles.image3} />

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
							value={name}
							onChangeText={Setfoodname}
							placeholder="음식 이름 입력"
						/>

					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"중량 (g)"}
						</Text>
						<TextInput
							style={styles.box5}
							value={weight}
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
							value={kcal}
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
							value={Carbohydrate}
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
							value={dietaryfiber}
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
							value={Sodium}
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


					<View style={styles.column3}>
						<View style={styles.row6}>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image4}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image4}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image4}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image4}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image4}
							/>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text4}>
								{"기록"}
							</Text>
							<Text style={styles.text5}>
								{"대결"}
							</Text>
							<Text style={styles.text6}>
								{"홈"}
							</Text>
							<Text style={styles.text7}>
								{"타이머"}
							</Text>
							<Text style={styles.text8}>
								{"운동메이트"}
							</Text>
						</View>
						<View style={styles.box6}>
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
		paddingBottom: 29,
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
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 31,
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
		flex: 1,
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