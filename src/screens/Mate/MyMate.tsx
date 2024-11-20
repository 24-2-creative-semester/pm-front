import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, } from "react-native";
const MyMate = () => {
	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView 
				horizontal 
				style={{
					flex: 1,
					flexDirection: "row",
					backgroundColor: "#FFFFFF",
					paddingVertical: 1,
				}}>
				<View 
					style={{
						width: 393,
					}}>
					<View >
						<View 
							style={{
								backgroundColor: "#1D1B20",
								paddingTop: 167,
								paddingBottom: 45,
								paddingHorizontal: 24,
							}}>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 16,
									marginBottom: 7,
								}}>
								{"제목"}
							</Text>
							<View 
								style={{
									backgroundColor: "#625E67",
									borderRadius: 8,
									paddingVertical: 17,
									paddingHorizontal: 16,
									marginBottom: 17,
								}}>
								<Text 
									style={{
										color: "#BABABA",
										fontSize: 16,
									}}>
									{"제목을 입력하세요"}
								</Text>
							</View>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 16,
									marginBottom: 7,
								}}>
								{"내용"}
							</Text>
							<View 
								style={{
									backgroundColor: "#625E67",
									borderRadius: 8,
									paddingVertical: 17,
									paddingHorizontal: 16,
									marginBottom: 17,
								}}>
								<Text 
									style={{
										color: "#BABABA",
										fontSize: 16,
									}}>
									{"예) 뚝섬역 2번출구에서 봬요!"}
								</Text>
							</View>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 16,
									marginBottom: 7,
								}}>
								{"종목"}
							</Text>
							<View 
								style={{
									backgroundColor: "#625E67",
									borderRadius: 8,
									paddingVertical: 17,
									paddingHorizontal: 16,
									marginBottom: 32,
								}}>
								<Text 
									style={{
										color: "#BABABA",
										fontSize: 16,
									}}>
									{"종목을 입력하세요"}
								</Text>
							</View>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 16,
								}}>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 16,
										marginRight: 9,
									}}>
									{"날짜"}
								</Text>
								<View 
									style={{
										width: 120,
										height: 40,
										backgroundColor: "#625F67",
										borderRadius: 8,
										marginRight: 33,
									}}>
								</View>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 16,
										marginRight: 10,
									}}>
									{"시간"}
								</Text>
								<View 
									style={{
										width: 120,
										height: 40,
										backgroundColor: "#625F67",
										borderRadius: 8,
									}}>
								</View>
							</View>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 25,
								}}>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 16,
										marginRight: 11,
									}}>
									{"인원"}
								</Text>
								<View 
									style={{
										width: 120,
										height: 40,
										backgroundColor: "#625F67",
										borderRadius: 8,
									}}>
								</View>
							</View>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 16,
									marginBottom: 7,
								}}>
								{"성별"}
							</Text>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 17,
								}}>
								<View 
									style={{
										width: 111,
										alignItems: "center",
										backgroundColor: "#625F67",
										borderRadius: 8,
										paddingVertical: 13,
										marginRight: 6,
									}}>
									<Text 
										style={{
											color: "#BABABA",
											fontSize: 14,
										}}>
										{"남성"}
									</Text>
								</View>
								<View 
									style={{
										width: 111,
										alignItems: "center",
										backgroundColor: "#625F67",
										borderRadius: 8,
										paddingVertical: 13,
										marginRight: 6,
									}}>
									<Text 
										style={{
											color: "#BABABA",
											fontSize: 14,
										}}>
										{"여성"}
									</Text>
								</View>
								<View 
									style={{
										width: 111,
										alignItems: "center",
										backgroundColor: "#625F67",
										borderRadius: 8,
										paddingVertical: 13,
									}}>
									<Text 
										style={{
											color: "#BABABA",
											fontSize: 14,
										}}>
										{"성별무관"}
									</Text>
								</View>
							</View>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 16,
									marginBottom: 7,
								}}>
								{"지역"}
							</Text>
							<View 
								style={{
									backgroundColor: "#625E67",
									borderRadius: 8,
									paddingVertical: 17,
									paddingHorizontal: 16,
									marginBottom: 17,
								}}>
								<Text 
									style={{
										color: "#BABABA",
										fontSize: 16,
									}}>
									{"지역을 입력하세요"}
								</Text>
							</View>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 16,
									marginBottom: 7,
								}}>
								{"장소"}
							</Text>
							<View 
								style={{
									backgroundColor: "#625E67",
									borderRadius: 8,
									paddingVertical: 17,
									paddingHorizontal: 16,
								}}>
								<Text 
									style={{
										color: "#BABABA",
										fontSize: 16,
									}}>
									{"장소를 입력하세요"}
								</Text>
							</View>
						</View>
						<View 
							style={{
								position: "absolute",
								top: -1,
								right: 0,
								left: 0,
								height: 135,
								backgroundColor: "#1D1B20",
							}}>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 11,
									marginBottom: 38,
									marginHorizontal: 34,
								}}>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 16,
										marginRight: 4,
										flex: 1,
									}}>
									{"9:41"}
								</Text>
								<View 
									style={{
										width: 125,
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
										backgroundColor: "#000000",
										borderRadius: 100,
										marginRight: 22,
									}}>
									<View 
										style={{
											width: 80,
											height: 37,
											backgroundColor: "#000000",
											borderRadius: 100,
										}}>
									</View>
									<View 
										style={{
											width: 37,
											height: 37,
											backgroundColor: "#000000",
											borderRadius: 100,
										}}>
									</View>
								</View>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 18,
										height: 12,
										marginRight: 8,
									}}
								/>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 17,
										height: 11,
										marginRight: 8,
									}}
								/>
								<View 
									style={{
										width: 25,
										borderColor: "#FFFFFF",
										borderRadius: 4,
										borderWidth: 1,
										paddingHorizontal: 2,
										marginRight: 1,
									}}>
									<View 
										style={{
											height: 9,
											backgroundColor: "#FFFFFF",
											borderRadius: 2,
											marginTop: 2,
										}}>
									</View>
								</View>
								<View 
									style={{
										width: 1,
										height: 4,
										backgroundColor: "#FFFFFF",
									}}>
								</View>
							</View>
							<View 
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginHorizontal: 24,
								}}>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 20,
									}}>
									{"취소"}
								</Text>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 20,
									}}>
									{"모임 생성하기"}
								</Text>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 20,
									}}>
									{"생성"}
								</Text>
							</View>
						</View>
					</View>
					<View 
						style={{
							position: "absolute",
							bottom: -98,
							right: 0,
							left: 0,
							height: 104,
							backgroundColor: "#1D1B20",
						}}>
						<View 
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginTop: 24,
								marginBottom: 9,
								marginHorizontal: 24,
							}}>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 30,
									height: 30,
								}}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 30,
									height: 30,
								}}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 30,
									height: 30,
								}}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 30,
									height: 30,
								}}
							/>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 30,
									height: 30,
								}}
							/>
						</View>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginBottom: 17,
								marginHorizontal: 19,
							}}>
							<Text 
								style={{
									color: "#7C7C7C",
									fontSize: 10,
									marginRight: 4,
									flex: 1,
								}}>
								{"기록"}
							</Text>
							<Text 
								style={{
									color: "#7C7C7C",
									fontSize: 10,
									marginRight: 69,
								}}>
								{"대결"}
							</Text>
							<Text 
								style={{
									color: "#7C7C7C",
									fontSize: 10,
									marginRight: 63,
								}}>
								{"홈"}
							</Text>
							<Text 
								style={{
									color: "#7C7C7C",
									fontSize: 10,
									marginRight: 46,
								}}>
								{"타이머"}
							</Text>
							<Text 
								style={{
									color: "#6F6CFF",
									fontSize: 10,
								}}>
								{"운동메이트"}
							</Text>
						</View>
						<View 
							style={{
								height: 5,
								backgroundColor: "#FFFFFF",
								borderRadius: 100,
								marginHorizontal: 127,
							}}>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default MyMate;