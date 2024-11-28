import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RecordTabSelector from "../../../components/RecordTabSelector"; // RecordTabSelector import

const DietMain: React.FC = () => {
  // 날짜 선택 버튼 핸들러
  const handleDatePress = () => {
    console.log("달력 화면으로 이동"); // WeightCalendarScreen 이동 로직 추가
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.row3}>
            <Icon name="chevron-back-outline" size={32} color="red" />
            <TouchableOpacity onPress={handleDatePress}>
              <Text style={styles.text2}>{"2024.09.14"}</Text>
            </TouchableOpacity>
            <Icon name="chevron-forward-outline" size={32} color="red" />
          </View>
          {/* RecordTabSelector 사용 */}
          <RecordTabSelector />
        </View>
        <View style={styles.column2}>
          <Text style={styles.text6}>{"오늘의 목표 달성률"}</Text>
          <View style={styles.row5}>
            <Text style={styles.text7}>{"● 탄수화물"}</Text>
            <Text style={styles.text7}>{"● 단백질"}</Text>
            <Text style={styles.text8}>{"● 지방"}</Text>
          </View>
          <View style={styles.view2}>
            <View style={styles.box6} />
          </View>
          <Text style={styles.text9}>{"25%"}</Text>
          <View style={styles.view2}>
            <View style={styles.box7} />
          </View>
          <Text style={styles.text9}>{"75%"}</Text>
          <View style={styles.view2}>
            <View style={styles.box8} />
          </View>
          <Text style={styles.text10}>{"45%"}</Text>
          <View style={styles.row6}>
            <Text style={styles.text11}>{"아침식사"}</Text>
            <Icon name="add-circle-outline" size={32} color="red" />
          </View>
          <View style={styles.row7}>
            <Text style={styles.text12}>{"하림 닭가슴살\n신전 떡볶이"}</Text>
            <Icon name="close-outline" size={32} color="red" />
          </View>
          <View style={styles.row6}>
            <Text style={styles.text11}>{"점심식사"}</Text>
            <Icon name="add-circle-outline" size={32} color="red" />
          </View>
          <View style={styles.box9} />
          <View style={styles.row6}>
            <Text style={styles.text11}>{"저녁식사"}</Text>
            <Icon name="add-circle-outline" size={32} color="red" />
          </View>
          <View style={styles.box9} />
          <View style={styles.row6}>
            <Text style={styles.text11}>{"간식"}</Text>
            <Icon name="add-circle-outline" size={32} color="red" />
          </View>
          <View style={styles.box10} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1B20",
  },
  scrollView: {
    flex: 1,
  },
  column: {
    backgroundColor: "#1D1B20",
    paddingVertical: 11,
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginHorizontal: 30,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  column2: {
    backgroundColor: "#1D1B20",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text6: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 15,
  },
  row5: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  text7: {
    color: "#FFFFFF",
    fontSize: 14,
    marginRight: 10,
  },
  text8: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  view2: {
    backgroundColor: "#625F67",
    height: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  box6: {
    backgroundColor: "#6F6CFF",
    height: 20,
    width: "25%",
  },
  box7: {
    backgroundColor: "#D6FF0A",
    height: 20,
    width: "50%",
  },
  box8: {
    backgroundColor: "#69FFD7",
    height: 20,
    width: "45%",
  },
  text9: {
    color: "#BABABA",
    fontSize: 14,
    marginVertical: 5,
  },
  text10: {
    color: "#BABABA",
    fontSize: 14,
    marginVertical: 5,
  },
  row6: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  text11: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  row7: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B7B5BA",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  text12: {
    color: "#000000",
    fontSize: 16,
  },
  box9: {
    height: 50,
    backgroundColor: "#B7B5BA",
    borderRadius: 8,
    marginVertical: 10,
  },
  box10: {
    height: 50,
    backgroundColor: "#B7B5BA",
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default DietMain;
