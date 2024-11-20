import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, } from "react-native";
const ExerciseMain = () => {
	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
				}}>
				<View 
					style={{
						marginTop: 1,
					}}>
					<View 
						style={{
							backgroundColor: "#1D1B20",
							paddingTop: 164,
						}}>
						<View 
							style={{
								width: 64,
								height: 3,
								backgroundColor: "#6F6CFF",
								marginBottom: 21,
								marginHorizontal: 88,
							}}>
						</View>
						<View 
							style={{
								backgroundColor: "#6F6CFF",
								borderRadius: 20,
								paddingVertical: 22,
								paddingHorizontal: 20,
								marginBottom: 24,
								marginHorizontal: 24,
							}}>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 18,
									marginBottom: 41,
								}}>
								{"오늘 소모한 칼로리"}
							</Text>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 45,
								}}>
								{"총 150kcal"}
							</Text>
						</View>
						<View 
							style={{
								backgroundColor: "#FFFFFF",
								borderRadius: 20,
								paddingVertical: 22,
								paddingHorizontal: 20,
								marginBottom: 155,
								marginHorizontal: 24,
							}}>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 34,
								}}>
								<Text 
									style={{
										color: "#6F6CFF",
										fontSize: 18,
										marginRight: 4,
										flex: 1,
									}}>
									{"오늘의 운동"}
								</Text>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 14,
										height: 14,
									}}
								/>
							</View>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 16,
								}}>
								<Text 
									style={{
										color: "#000000",
										fontSize: 22,
										marginRight: 4,
										flex: 1,
									}}>
									{"헬스 (격렬하게)"}
								</Text>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 19,
										height: 19,
									}}
								/>
							</View>
							<Text 
								style={{
									color: "#000000",
									fontSize: 16,
									marginBottom: 12,
								}}>
								{"50kcal / 10mins"}
							</Text>
							<View 
								style={{
									height: 2,
									backgroundColor: "#F1F1F1",
									marginBottom: 10,
								}}>
							</View>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 16,
								}}>
								<Text 
									style={{
										color: "#000000",
										fontSize: 22,
										marginRight: 4,
										flex: 1,
									}}>
									{"런닝"}
								</Text>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 19,
										height: 19,
									}}
								/>
							</View>
							<Text 
								style={{
									color: "#000000",
									fontSize: 16,
								}}>
								{"100kcal / 60mins"}
							</Text>
						</View>
						<View 
							style={{
								backgroundColor: "#1D1B20",
								paddingTop: 28,
								paddingBottom: 8,
							}}>
							<View 
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 7,
									marginHorizontal: 29,
								}}>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 27,
										height: 27,
									}}
								/>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 27,
										height: 27,
									}}
								/>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 27,
										height: 27,
									}}
								/>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 27,
										height: 27,
									}}
								/>
								<Image
									source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 27,
										height: 27,
									}}
								/>
							</View>
							<View 
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 19,
									marginHorizontal: 22,
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
										marginRight: 66,
									}}>
									{"대결"}
								</Text>
								<Text 
									style={{
										color: "#7161FF",
										fontSize: 10,
										marginRight: 62,
									}}>
									{"홈"}
								</Text>
								<Text 
									style={{
										color: "#7C7C7C",
										fontSize: 10,
										marginRight: 44,
									}}>
									{"타이머"}
								</Text>
								<Text 
									style={{
										color: "#7C7C7C",
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
					<View 
						style={{
							position: "absolute",
							top: -1,
							right: 0,
							left: 0,
							height: 165,
							backgroundColor: "#1D1B20",
						}}>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginTop: 11,
								marginBottom: 29,
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
								marginBottom: 32,
								marginHorizontal: 80,
							}}>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 8,
									height: 16,
								}}
							/>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 28,
								}}>
								{"2024 09 14"}
							</Text>
							<Image
								source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
								resizeMode = {"stretch"}
								style={{
									width: 8,
									height: 16,
								}}
							/>
						</View>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginHorizontal: 41,
							}}>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 18,
									marginRight: 33,
								}}>
								{"식단"}
							</Text>
							<Text 
								style={{
									color: "#6F6CFF",
									fontSize: 18,
									marginRight: 27,
								}}>
								{"운동"}
							</Text>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 18,
									marginRight: 27,
								}}>
								{"눈바디"}
							</Text>
							<Text 
								style={{
									color: "#FFFFFF",
									fontSize: 18,
									flex: 1,
								}}>
								{"체중"}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ExerciseMain;