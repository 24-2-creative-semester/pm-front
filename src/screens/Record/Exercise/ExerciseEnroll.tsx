import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, } from "react-native";

const ExerciseEnroll = () => {
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
						backgroundColor: "#1D1B20",
						paddingTop: 11,
						paddingBottom: 29,
						paddingRight: 31,
					}}>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 37,
							marginLeft: 56,
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
							alignItems: "center",
							marginLeft: 31,
						}}>
						<Image
							source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
							resizeMode = {"stretch"}
							style={{
								width: 9,
								height: 19,
								marginRight: 119,
							}}
						/>
						<Text 
							style={{
								color: "#FFFFFF",
								fontSize: 20,
								flex: 1,
							}}>
							{"운동 등록"}
						</Text>
					</View>
				</View>
				<View 
					style={{
						backgroundColor: "#1D1B20",
						paddingTop: 44,
					}}>
					<View 
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 24,
							marginHorizontal: 24,
						}}>
						<Text 
							style={{
								color: "#FFFFFF",
								fontSize: 20,
							}}>
							{"이름"}
						</Text>
						<View 
							style={{
								width: 210,
								height: 48,
								backgroundColor: "#625E67",
								borderRadius: 8,
							}}>
						</View>
					</View>
					<View 
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 375,
							marginHorizontal: 24,
						}}>
						<Text 
							style={{
								color: "#FFFFFF",
								fontSize: 20,
							}}>
							{"칼로리 (kcal)"}
						</Text>
						<View 
							style={{
								width: 210,
								height: 48,
								backgroundColor: "#625E67",
								borderRadius: 8,
							}}>
						</View>
					</View>
					<View 
						style={{
							alignItems: "center",
							backgroundColor: "#6F6CFF4D",
							borderRadius: 8,
							paddingVertical: 19,
							marginBottom: 18,
							marginHorizontal: 24,
						}}>
						<Text 
							style={{
								color: "#FFFFFF",
								fontSize: 20,
							}}>
							{"완료"}
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
			</ScrollView>
		</SafeAreaView>
	)
}

export default ExerciseEnroll;