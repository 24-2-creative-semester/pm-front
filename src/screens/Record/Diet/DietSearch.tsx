import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Icon library

type FoodItem = {
  foodname: string;
  foodCalories: number;
  foodId: number;
  manufacturingCompany: string;
};

const DietSearch = ({ route }: any) => {
  const { mealtime } = route.params; // 'morning' value received
  const [data, setData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.45.176:8080/food/searchAll");
      const result = await response.json();
      setData(result.result || []); // Ensure data is an array
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = searchText
    ? data.filter((item) =>
        item.foodname.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DietDetail", {
          foodid: item.foodId,
          mealtime: mealtime,
        })
      }
    >
      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodname}</Text>
        <Text style={styles.foodCalories}>{item.foodCalories} kcal</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>식단 검색</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="식단을 검색하세요"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Food List */}
      <FlatList
        data={filteredData}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.foodId.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          navigation.navigate("DietEnroll", { mealtime: mealtime })
        }
      >
        <Icon name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DietSearch;
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#1D1B20",
	},
	header: {
	  flexDirection: "row",
	  alignItems: "center",
	  padding: 15,
	  backgroundColor: "#1D1B20",
	},
	backButton: {
	  marginRight: 15,
	},
	backButtonText: {
	  color: "#FFFFFF",
	  fontSize: 20,
	},
	headerTitle: {
	  color: "#FFFFFF",
	  fontSize: 18,
	  fontWeight: "bold",
	  marginBottom:10,
	},
	searchContainer: {
	  backgroundColor: "#1D1B20",
	  paddingHorizontal: 15,
	  paddingVertical: 20,
	},
	searchInput: {
	  backgroundColor: "#625F67",
	  padding: 10,
	  borderRadius: 8,
	  fontSize: 16,
	},
	listContent: {
	  paddingHorizontal: 15,
	  paddingBottom: 60, // Add space for floating button
	},
	card: {
	  backgroundColor: "#FFFFFF",
	  borderRadius: 10,
	  padding: 15,
	  marginBottom: 10,
	  flexDirection: "row",
	  alignItems: "center",
	  justifyContent: "space-between",
	},
	colorIndicator: {
	  width: 5,
	  height: "100%",
	  borderRadius: 2,
	  marginRight: 10,
	},
	cardContent: {
	  flex: 1,
	  justifyContent: "space-between",
	},
	foodName: {
	  color: "#000000",
	  fontSize: 16,
	  fontWeight: "bold",
	},
	foodCalories: {
	  color: "#999999",
	  fontSize: 14,
	},
	closeIcon: {
	  fontSize: 20,
	  color: "#999999",
	  marginLeft: 10,
	},
	loadingText: {
	  textAlign: "center",
	  marginTop: 20,
	  fontSize: 18,
	  color: "#888",
	},
	emptyText: {
	  textAlign: "center",
	  marginTop: 20,
	  fontSize: 16,
	  color: "#999999",
	},
	floatingButton: {
	  position: "absolute",
	  bottom: 20,
	  right: 20,
	  width: 60,
	  height: 60,
	  borderRadius: 30,
	  backgroundColor: "#6F6DFF",
	  alignItems: "center",
	  justifyContent: "center",
	  shadowColor: "#000",
	  shadowOffset: { width: 0, height: 4 },
	  shadowOpacity: 0.3,
	  shadowRadius: 4,
	  elevation: 5,
	},
  });
  