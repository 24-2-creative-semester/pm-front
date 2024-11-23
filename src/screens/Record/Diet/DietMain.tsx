import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
export default () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.row3}>
						<Icon name="chevron-back-outline" size={32} color="red" />
						<Text style={styles.text2}>	{/*날짜받기*/}
							{"2024 09 14"} 		
						</Text>
						<Icon name="chevron-forward-outline" size={32} color="red" />
					</View>
					<View style={styles.row4}>
						<Text style={styles.text3}>
							{"식단"}
						</Text>
						<Text style={styles.text4}>
							{"운동"}
						</Text>
						<Text style={styles.text4}>
							{"눈바디"}
						</Text>
						<Text style={styles.text5}>
							{"체중"}
						</Text>
					</View>
				</View>
				<View style={styles.column2}>
					<View style={styles.box5}>
					</View>
					<Text style={styles.text6}>
						{"오늘의 목표 달성률"}
					</Text>
					<View style={styles.row5}>
						<Text style={styles.text7}>
							{"● 탄수화물"}
						</Text>
						<Text style={styles.text7}>
							{"● 단백질"}
						</Text>
						<Text style={styles.text8}>
							{"● 지방"}
						</Text>
					</View>
					<View style={styles.view2}>
						<View style={styles.box6}>
						</View>
					</View>
					<Text style={styles.text9}>
						{"25%"}
					</Text>
					<View style={styles.view2}>
						<View style={styles.box7}>
						</View>
					</View>
					<Text style={styles.text9}>
						{"75%"}
					</Text>
					<View style={styles.view2}>
						<View style={styles.box8}>
						</View>
					</View>
					<Text style={styles.text10}>
						{"45%"}
					</Text>
					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"아침식사"}
						</Text>
						<Icon name="add-circle-outline" size={32} color="red" />
					</View>
					<View style={styles.row7}>
						<Text style={styles.text12}>
							{"하림 닭가슴살\n"}
							{"신전 떡볶이"}	
						</Text>
						<Icon name="close-outline" size={32} color="red" />
					</View>
					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"점심식사"}
						</Text>
						<Icon name="add-circle-outline" size={32} color="red" />
					</View>
					<View style={styles.box9}>
					</View>
					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"저녁식사"}
						</Text>
						<Icon name="add-circle-outline" size={32} color="red" />
					</View>
					<View style={styles.box9}>
					</View>
					<View style={styles.row6}>
						<Text style={styles.text11}>
							{"간식"}
						</Text>
						<Icon name="add-circle-outline" size={32} color="red" />
					</View>
					<View style={styles.box10}>
					</View>
					<View style={styles.column3}>
						<View style={styles.row8}>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image7}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image7}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image7}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image7}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={styles.image7}
							/>
						</View>
						<View style={styles.row9}>
							<Text style={styles.text13}>
								{"기록"}
							</Text>
							<Text style={styles.text14}>
								{"대결"}
							</Text>
							<Text style={styles.text15}>
								{"홈"}
							</Text>
							<Text style={styles.text16}>
								{"타이머"}
							</Text>
							<Text style={styles.text17}>
								{"운동메이트"}
							</Text>
						</View>
						<View style={styles.box11}>
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
		width: 64,
		height: 3,
		backgroundColor: "#6F6CFF",
		marginBottom: 27,
		marginHorizontal: 24,
	},
	box6: {
		width: 86,
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
});