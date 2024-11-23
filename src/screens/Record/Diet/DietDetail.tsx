import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
export default () => {
	const [quantity, setQuantity] = useState(1); // 수량 기본값 1
  
	const increaseQuantity = () => setQuantity((prev) => prev + 1); // 수량 증가
	const decreaseQuantity = () =>
	  setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // 수량 감소 (최소값 1)

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
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
							source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
							resizeMode = {"stretch"}
							style={styles.image}
						/>
						<Image
							source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
							resizeMode = {"stretch"}
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
						<Icon name="chevron-back-outline" size={32} color="red" />
						<Text style={styles.text2}>
							{"상세정보"}
						</Text>
					</View>
				</View>
				<View style={styles.column2}>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"하림 닭가슴살"}
						</Text>

						<TouchableOpacity
						style={styles.view2}
						//</View>onPress={sendDataToServer}
					>
						<Text style={styles.text4}>추가</Text>
					</TouchableOpacity>

						


					</View>
					<View style={styles.row5}>
						<Text style={styles.text5}>
							{"수량"}
						</Text>
						<TouchableOpacity onPress={decreaseQuantity}>
							<Icon name="remove-circle-outline" size={32} color="red" />
						</TouchableOpacity>
						<Text style={styles.text6}>{quantity}</Text>
						<TouchableOpacity onPress={increaseQuantity}>
							<Icon name="add-circle-outline" size={32} color="red" />
						</TouchableOpacity>
					</View>
					<View style={styles.row6}>
						<Text style={styles.text7}>
							{"단위"}
						</Text>
						<View style={styles.view3}>
							<Text style={styles.text7}>
								{"g"}
							</Text>
						</View>
					</View>
					<View style={styles.column3}>
						<View style={styles.row7}>
							<Text style={styles.text8}>
								{"칼로리"}
							</Text>
							<Text style={styles.text9}>
								{"120kcal"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>
								{"단백질"}
							</Text>
							<Text style={styles.text9}>
								{"50g"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>
								{"지방"}
							</Text>
							<Text style={styles.text9}>
								{"2g"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>
								{"탄수화물"}
							</Text>
							<Text style={styles.text9}>
								{"1g"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>
								{"식이섬유"}
							</Text>
							<Text style={styles.text9}>
								{"2g"}
							</Text>
						</View>
						<View style={styles.row7}>
							<Text style={styles.text8}>
								{"나트륨"}
							</Text>
							<Text style={styles.text9}>
								{"1g"}
							</Text>
						</View>
						<View style={styles.row8}>
							<Text style={styles.text8}>
								{"당류"}
							</Text>
							<Text style={styles.text9}>
								{"20g"}
							</Text>
						</View>
					</View>
					<View style={styles.column4}>
						<View style={styles.row9}>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image6}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image6}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image6}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image6}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image6}
							/>
						</View>
						<View style={styles.row10}>
							<Text style={styles.text10}>
								{"기록"}
							</Text>
							<Text style={styles.text11}>
								{"대결"}
							</Text>
							<Text style={styles.text12}>
								{"홈"}
							</Text>
							<Text style={styles.text13}>
								{"타이머"}
							</Text>
							<Text style={styles.text14}>
								{"운동메이트"}
							</Text>
						</View>
						<View style={styles.box5}>
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
		fontSize: 28,
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 18,
	},
	text5: {
		color: "#FFFFFF",
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
		paddingTop: 16,
		paddingBottom: 4,
		paddingLeft: 70,
		paddingRight: 10,
	},
});