import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

const BattleResult = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.titleText}>대결에서 이겼어요!</Text>
			<Text style={styles.congratsText}>축하해요!</Text>

			<View style={styles.resultContainer}>
				{/* 승리자 카드 */}
				<View style={[styles.resultCard, styles.winnerCard]}>
					<Text style={styles.nameText}>송대현</Text>
					<Text style={styles.resultText}>WIN</Text>
				</View>

				{/* 가운데 번개 모양 */}
				<Text style={styles.versusIcon}>⚡</Text>

				{/* 패배자 카드 */}
				<View style={[styles.resultCard, styles.loserCard]}>
					<Text style={styles.nameText}>이태환</Text>
					<Text style={styles.resultText}>LOSE</Text>
				</View>
			</View>

			{/* 하단 텍스트 */}
			<Text style={styles.footerText}>파이팅이요</Text>
		</SafeAreaView>
	);
};

export default BattleResult;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1D1B20",
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		color: "#6F6CFF",
		fontSize: 16,
		marginBottom: 10,
	},
	congratsText: {
		color: "#FFFFFF",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
	},
	resultContainer: {
		alignItems: "center",
		marginBottom: 50,
	},
	resultCard: {
		width: 120,
		height: 100,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20, // 카드 사이 간격 조정
	},
	winnerCard: {
		backgroundColor: "#6F6CFF",
	},
	loserCard: {
		backgroundColor: "#625E67",
	},
	nameText: {
		color: "#FFFFFF",
		fontSize: 16,
		marginBottom: 5,
	},
	resultText: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "bold",
	},
	versusIcon: {
		color: "#FFFFFF",
		fontSize: 24,
		marginVertical: 10, // 번개 모양 간격 조정
	},
	footerText: {
		color: "#FFFFFF",
		fontSize: 14,
		marginTop: 20,
	},
});
