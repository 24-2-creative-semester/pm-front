import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, FlatList, TextInput,TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../../navigations/types";
import { useNavigation,RouteProp } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';  // 아이콘 추가

type DietSearchRouteProp = RouteProp<RootStackParamList, 'DietSearch'>;
type DietSearchNavigationProp = StackNavigationProp<RootStackParamList, 'DietSearch'>;

type FoodItem = {
	foodname: string;
	foodCalories: number;
	foodId: number;
	manufacturingCompany: string;
};

type DietSearchProps = {
	route: DietSearchRouteProp;
  };

  const DietSearch = ({ route }: DietSearchProps) => {
	const { mealtime } = route.params; // 'morning' 값 받기
	const [data, setData] = useState<FoodItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState("");
	const navigation = useNavigation<DietSearchNavigationProp>();  // 수정: 정확한 타입 지정

	const filteredData = searchText
  ? data.filter((item) =>
      item.foodname.toLowerCase().includes(searchText.toLowerCase())
    )
  : data;

//console.log("Filtered Data:", filteredData);  // 필터링된 데이터 확인
//console.log("Search Text:", searchText);
//console.log("Filtered Data:", filteredData);

	  const fetchData = async () => {
		try {
		  const response = await fetch("http://172.16.86.241:8080/food/searchAll");
		  if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		  }
		  const result = await response.json();
		  //console.log("API Response:", result);  // 응답 확인
		  setData(result.result);  // 데이터 상태 업데이트
		} catch (error) {
		  console.error("Failed to fetch data:", error);
		} finally {
		  setLoading(false);
		}
	  };
	  
	  
	  useEffect(() => {
		fetchData();
	  }, []);
  
	if (loading) {
	  return (
		<SafeAreaView style={styles.container}>
		  <Text style={styles.loadingText}>Loading data...</Text>
		</SafeAreaView>
	  );
	}
  
	const renderFoodItem = ({ item }: { item: FoodItem }) => {
		//console.log("Rendering item:", item);  // 항목 렌더링 시 데이터를 확인
		
		return (
		  <TouchableOpacity
			style={styles.column4}
			onPress={() => {
			  // navigate 메서드를 사용하여 DietEnroll로 이동
			  navigation.navigate('DietDetail', {
				foodid: item.foodId,
				mealtime: mealtime,
			  });
			}}
		  >
			<View style={styles.row5}>
			  <View style={styles.box4}></View>
			  <Text style={styles.text4}>{item.foodname}</Text>
			  <View style={styles.box5}></View>
			</View>
			<Text style={styles.text5}>{item.foodCalories} kcal</Text>
		  </TouchableOpacity>
		);
	  };

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
						keyExtractor={(item) => item.foodId.toString()}  // 변경된 부분
						contentContainerStyle={styles.foodCardContainer}
						ListEmptyComponent={<Text style={styles.emptyText}>검색 결과가 없습니다.</Text>}
					
					/> 	
				</View>


				{/* <View style={styles.column4}>
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
				</View> */}
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
			{/* 아이콘 추가 */}
			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => {
					if (mealtime) {
						navigation.navigate('DietEnroll', { mealtime: mealtime });
					  } else {
						console.log("mealtime 값이 정의되지 않았습니다.");
					  }
				}}
			>
				<Icon name="add-circle-outline" size={32} color="red" />
			</TouchableOpacity>

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
	floatingButton: {
		position: 'absolute',
		bottom: 30,
		right: 20,
		backgroundColor: 'transparent',  // 투명한 배경
	},
});

export default DietSearch;