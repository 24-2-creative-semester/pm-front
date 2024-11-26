import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, } from "react-native";
import { RootStackParamList } from '../../navigations/types'; // RootStackParamList를 정의한 경로

export default () => {
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
						<Image
							source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<Text style={styles.text2}>
							{"대결 상대"}
						</Text>
					</View>
					<Text style={styles.text3}>
						{"대결상대님의 식단"}
					</Text>
					<Text style={styles.text4}>
						{"아침식사"}
					</Text>
					<View style={styles.view2}>
						<Text style={styles.text5}>
							{"하림 닭가슴살"}
						</Text>
					</View>
					<Text style={styles.text4}>
						{"점심식사"}
					</Text>
					<View style={styles.box5}>
					</View>
					<Text style={styles.text4}>
						{"저녁식사"}
					</Text>
					<View style={styles.box5}>
					</View>
					<Text style={styles.text4}>
						{"간식"}
					</Text>
					<View style={styles.box5}>
					</View>
					<Text style={styles.text4}>
						{"최종 칼로리 소모량"}
					</Text>
					<View style={styles.column2}>
						<View style={styles.row4}>
							<Text style={styles.text6}>
								{"먹은 식단"}
							</Text>
							<Text style={styles.text7}>
								{"120kcal"}
							</Text>
						</View>
						<View style={styles.row4}>
							<Text style={styles.text6}>
								{"식단 총량 칼로리"}
							</Text>
							<Text style={styles.text7}>
								{"120kcal"}
							</Text>
						</View>
						<View style={styles.row5}>
							<Text style={styles.text6}>
								{"운동 총량 칼로리"}
							</Text>
							<Text style={styles.text7}>
								{"120kcal"}
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
		backgroundColor: "FFFFFF",
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
		backgroundColor: "FFFFFF",
		borderRadius: 2,
		marginTop: 2,
	},
	box4: {
		width: 1,
		height: 4,
		backgroundColor: "FFFFFF",
	},
	box5: {
		height: 48,
		backgroundColor: "#B7B5BA",
		borderRadius: 8,
		marginBottom: 30,
		marginHorizontal: 24,
	},
	column: {
		backgroundColor: "#1D1B20",
		paddingTop: 10,
		paddingBottom: 122,
		marginTop: 1,
	},
	column2: {
		backgroundColor: "FFFFFF",
		borderRadius: 8,
		paddingTop: 18,
		paddingBottom: 42,
		paddingHorizontal: 16,
		marginHorizontal: 24,
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
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 37,
		marginHorizontal: 34,
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
		marginBottom: 60,
		marginHorizontal: 31,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
	},
	scrollView: {
		flex: 1,
		backgroundColor: "FFFFFF",
	},
	text: {
		color: "FFFFFF",
		fontSize: 16,
		marginRight: 4,
		flex: 1,
	},
	text2: {
		color: "FFFFFF",
		fontSize: 20,
		flex: 1,
	},
	text3: {
		color: "#BEBAC5",
		fontSize: 24,
		marginBottom: 35,
		marginLeft: 25,
	},
	text4: {
		color: "FFFFFF",
		fontSize: 20,
		marginBottom: 22,
		marginLeft: 24,
	},
	text5: {
		color: "#000000",
		fontSize: 18,
	},
	text6: {
		color: "#000000",
		fontSize: 18,
		marginRight: 4,
		flex: 1,
	},
	text7: {
		color: "#6F6CFF",
		fontSize: 18,
	},
	view: {
		width: 25,
		borderColor: "FFFFFF",
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 2,
		marginRight: 1,
	},
	view2: {
		backgroundColor: "#B7B5BA",
		borderRadius: 8,
		paddingVertical: 16,
		paddingHorizontal: 12,
		marginBottom: 30,
		marginHorizontal: 24,
	},
});