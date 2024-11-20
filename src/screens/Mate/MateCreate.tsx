import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, } from "react-native";
const MateCreate = () => {
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
						paddingTop: 10,
						marginTop: 1,
					}}>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 58,
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
					<Text 
						style={{
							fontSize: 24,
							marginBottom: 41,
							marginHorizontal: 24,
							width: 345,
						}}>
						{"운동메이트와 함께\n운동해보세요!"}
					</Text>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#625F67",
							borderRadius: 4,
							padding: 11,
							marginBottom: 17,
							marginHorizontal: 24,
						}}>
						<Image
							source = {{uri: "https://i.imgur.com/1tMFzp8.png"}} 
							resizeMode = {"stretch"}
							style={{
								width: 18,
								height: 18,
								marginRight: 15,
							}}
						/>
						<Text 
							style={{
								color: "#FFFFFF",
								fontSize: 16,
								flex: 1,
							}}>
							{"검색"}
						</Text>
					</View>
					<View 
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 23,
							marginHorizontal: 26,
						}}>
						<Text 
							style={{
								color: "#6F6CFF",
								fontSize: 16,
							}}>
							{"모임 생성"}
						</Text>
						<View 
							style={{
								width: 5,
								height: 12,
								backgroundColor: "#6F6CFF",
							}}>
						</View>
						<Text 
							style={{
								color: "#6F6CFF",
								fontSize: 16,
							}}>
							{"모임 관리"}
						</Text>
					</View>
					<View 
						style={{
							backgroundColor: "#FFFFFF",
							borderRadius: 8,
							padding: 12,
							marginBottom: 16,
							marginHorizontal: 24,
						}}>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginBottom: 15,
							}}>
							<Text 
								style={{
									color: "#6F6CFF",
									fontSize: 16,
									marginRight: 15,
								}}>
								{"배드민턴"}
							</Text>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
								}}>
								{"9월 17일 17:00"}
							</Text>
							<View 
								style={{
									flex: 1,
								}}>
							</View>
							<Text 
								style={{
									color: "#6F6CFF",
									fontSize: 14,
								}}>
								{"1/2명"}
							</Text>
						</View>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}>
							<View 
								style={{
									flex: 1,
									marginRight: 4,
								}}>
								<Text 
									style={{
										color: "#000000",
										fontSize: 14,
										marginBottom: 7,
									}}>
									{"세종대학교 대양AI센터 404호"}
								</Text>
								<Text 
									style={{
										color: "#6F6CFF",
										fontSize: 14,
									}}>
									{"성별무관"}
								</Text>
							</View>
							<View 
								style={{
									width: 65,
									alignItems: "center",
									backgroundColor: "#6F6CFF",
									borderRadius: 4,
									paddingVertical: 9,
								}}>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 12,
									}}>
									{"신청하기"}
								</Text>
							</View>
						</View>
					</View>
					<View 
						style={{
							backgroundColor: "#FFFFFF",
							borderRadius: 8,
							padding: 12,
							marginBottom: 261,
							marginHorizontal: 24,
						}}>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginBottom: 15,
							}}>
							<Text 
								style={{
									color: "#6F6CFF",
									fontSize: 16,
									marginRight: 14,
								}}>
								{"축구"}
							</Text>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
								}}>
								{"9월 17일 17:00"}
							</Text>
							<View 
								style={{
									flex: 1,
								}}>
							</View>
							<Text 
								style={{
									color: "#6F6CFF",
									fontSize: 14,
								}}>
								{"2/2명"}
							</Text>
						</View>
						<View 
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}>
							<View 
								style={{
									flex: 1,
									marginRight: 4,
								}}>
								<Text 
									style={{
										color: "#000000",
										fontSize: 14,
										marginBottom: 7,
									}}>
									{"세종대학교 대양AI센터 404호"}
								</Text>
								<Text 
									style={{
										color: "#6F6CFF",
										fontSize: 14,
										marginLeft: 1,
									}}>
									{"남자"}
								</Text>
							</View>
							<View 
								style={{
									width: 65,
									alignItems: "center",
									backgroundColor: "#625F67",
									borderRadius: 4,
									paddingVertical: 9,
								}}>
								<Text 
									style={{
										color: "#FFFFFF",
										fontSize: 12,
									}}>
									{"모집마감"}
								</Text>
							</View>
						</View>
					</View>
					<View 
						style={{
							backgroundColor: "#1D1B20",
							paddingTop: 24,
							paddingBottom: 8,
						}}>
						<View 
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
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

export default MateCreate;