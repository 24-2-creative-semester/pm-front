import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, FlatList, TextInput } from "react-native";

type FoodItem = {
	food_name: string;
	food_calories: number;
};


//임의의 데이터
const mockData: FoodItem[] = [
	{ food_name: "맛없는 서브웨이", food_calories: 120 },
	{ food_name: "불닭볶음면", food_calories: 1200 },
	{ food_name: "카레", food_calories: 150 },
	{ food_name: "chicken", food_calories: 500 },
	{ food_name: "피자", food_calories: 600 },
	{ food_name: "햄버거", food_calories: 700 },
];


export default () => {
	const [data, setData] = useState<FoodItem[]>([]); // 서버에서 가져온 데이터를 저장할 상태
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [searchText, setSearchText] = useState(""); // 입력 상태를 관리
	const filteredData = searchText
		? data.filter((item) =>
				item.food_name.toLowerCase().includes(searchText.toLowerCase())
		  )
		: data;

	const renderFoodItem = ({ item }: { item: FoodItem }) => (
		<View style={styles.column4}>
			<View style={styles.row5}>
				<View style={styles.box4}></View>
				<Text style={styles.text4}>{item.food_name}</Text>
				<View style={styles.box5}></View>
			</View>
			<Text style={styles.text5}>{item.food_calories} kcal</Text>
		</View>
	);

	// 데이터 가져오기
	const fetchData = async () => {
		try {
			const response = await fetch("https://api.example.com/foods"); // 서버 URL
			//const result = await response.json(); // JSON 응답 처리
			const result: { result: FoodItem[] } = await response.json(); // 응답 타입 지정
			//setData(result.result); // 데이터 저장
			// 서버 요청 대신 mockData를 사용
			setData(mockData);
		} catch (error) {
			console.error("데이터 로드 실패:", error);
			// 서버 요청 대신 mockData를 사용
			setData(mockData);
		} finally {
			setLoading(false); // 로딩 종료
		}
	};

	useEffect(() => {
		fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
	}, []);

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.loadingText}>데이터를 불러오는 중...</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>

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
					<View style={styles.column2}>
						<View style={styles.view}>
							<View style={styles.box3}>
							</View>
						</View>
						<View style={styles.absoluteBox}>
						</View>
					</View>
				</View>
				<View style={styles.row3}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"stretch"}
						style={styles.image3}
					/>
					<Text style={styles.text2}>
						{"식단 검색"}
					</Text>
				</View>
			</View>
			<View style={styles.column3}>
				<View style={styles.row4}>
					<Image
						source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
						resizeMode={"stretch"}
						style={styles.image4}
					/>
					<TextInput
						//style={styles.searchInput}
						placeholder="식단을 검색하세요"
						value={searchText}
						onChangeText={(text) => setSearchText(text)} // 입력값 업데이트

					/>
				</View>

				{/* 음식 카드 영역 */}
				<View style={styles.flatListContainer}>
					<FlatList
						data={filteredData}
						renderItem={renderFoodItem}
						keyExtractor={(item, index) => index.toString()}
						contentContainerStyle={styles.foodCardContainer}
						ListEmptyComponent={<Text style={styles.emptyText}>검색 결과가 없습니다.</Text>}
					
					/>
				</View>


				<View style={styles.column4}>
					<View style={styles.row5}>
						<View style={styles.box6}>
						</View>
						<Text style={styles.text4}>
							{"불닭볶음면 (150g)"}
						</Text>
						<View style={styles.box5}>
						</View>

					</View>
					<Text style={styles.text5}>
						{"1200kcal"}
					</Text>
				</View>
				<View style={styles.column5}>
					<View style={styles.row5}>
						<View style={styles.box7}>
						</View>
						<Text style={styles.text4}>
							{"카레 (150g)"}
						</Text>
						<View style={styles.box5}>
						</View>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image5}
						/>
					</View>
					<Text style={styles.text5}>
						{"120kcal"}
					</Text>
				</View>
				<Image
					source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
					resizeMode={"stretch"}
					style={styles.image6}
				/>
				<View style={styles.column6}>
					<View style={styles.row6}>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image7}
						/>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image7}
						/>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image7}
						/>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image7}
						/>
						<Image
							source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
							resizeMode={"stretch"}
							style={styles.image7}
						/>
					</View>
					<View style={styles.row7}>
						<Text style={styles.text6}>
							{"기록"}
						</Text>
						<Text style={styles.text7}>
							{"대결"}
						</Text>
						<Text style={styles.text8}>
							{"홈"}
						</Text>
						<Text style={styles.text9}>
							{"타이머"}
						</Text>
						<Text style={styles.text10}>
							{"운동메이트"}
						</Text>
					</View>
					<View style={styles.box8}>
					</View>
				</View>
			</View>

		</SafeAreaView >
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	absoluteBox: {
		position: "absolute",
		bottom: 4,
		right: -1,
		width: 1,
		height: 4,
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
		height: 24,
		backgroundColor: "#00FF7B",
		marginTop: 7,
		marginRight: 16,
	},
	box5: {
		flex: 1,
	},
	box6: {
		width: 1,
		height: 24,
		backgroundColor: "#FF0072",
		marginTop: 7,
		marginRight: 16,
	},
	box7: {
		width: 1,
		height: 24,
		backgroundColor: "#FFD400",
		marginTop: 7,
		marginRight: 16,
	},
	box8: {
		height: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		marginHorizontal: 127,
	},
	column: {
		backgroundColor: "#1D1B20",
		paddingTop: 11,
		paddingBottom: 29,
		paddingRight: 32,
	},
	column2: {
		width: 25,
	},
	column3: {
		backgroundColor: "#1D1B20",
		paddingTop: 24,
	},
	column4: {
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		paddingVertical: 8,
		marginBottom: 20,
		marginHorizontal: 24,
	},
	column5: {
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		paddingVertical: 8,
		marginBottom: 157,
		marginHorizontal: 24,
	},
	column6: {
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
		marginRight: 118,
	},
	image4: {
		width: 20,
		height: 20,
		marginRight: 11,
	},
	image5: {
		width: 19,
		height: 19,
	},
	image6: {
		width: 56,
		height: 56,
		marginBottom: 24,
		marginHorizontal: 24,
	},
	image7: {
		width: 27,
		height: 27,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 37,
		marginLeft: 57,
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
		alignItems: "center",
		marginLeft: 32,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#625F67",
		borderRadius: 8,
		paddingVertical: 9,
		paddingHorizontal: 10,
		marginBottom: 32,
		marginHorizontal: 24,
	},
	row5: {
		flexDirection: "row",
		marginBottom: 9,
		marginHorizontal: 8,
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
		fontSize: 20,
		flex: 1,
	},
	text3: {
		color: "#47434E",
		fontSize: 16,
		flex: 1,
	},
	text4: {
		color: "#000000",
		fontSize: 18,
		marginTop: 10,
	},
	text5: {
		color: "#625F67",
		fontSize: 16,
		marginLeft: 33,
	},
	text6: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 4,
		flex: 1,
	},
	text7: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 66,
	},
	text8: {
		color: "#7161FF",
		fontSize: 10,
		marginRight: 62,
	},
	text9: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 44,
	},
	text10: {
		color: "#7C7C7C",
		fontSize: 10,
	},
	view: {
		borderColor: "#FFFFFF",
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 2,
	},
	loadingText: {
		textAlign: "center",
		marginTop: 20,
		fontSize: 18,
		color: "#888",
	}, foodListContainer: {
		flex: 1,
		padding: 8,
		//height: 400,
	},
	foodCardContainer: {
		paddingBottom: 16,
		height: 400,
	},
	flatListContainer: {
		//flex: 1, // 화면의 나머지 공간을 차지
		marginHorizontal: 20, // 양 옆 여백 추가
		marginBottom: 10, // 하단 여백 추가
		height: 200,
	},
	emptyText: {
		textAlign: "center",
		marginTop: 20,
		fontSize: 16,
		color: "#999999",
	},
});