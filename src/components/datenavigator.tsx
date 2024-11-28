import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface DateNavigatorProps {
  initialDate?: string;
  onDateChange?: (date: string) => void; // 날짜 변경 콜백
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  initialDate,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    initialDate || new Date().toISOString().split("T")[0]
  );

  const navigation = useNavigation();

  const updateDate = (days: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    const updatedDate = currentDate.toISOString().split("T")[0];
    setSelectedDate(updatedDate);
    if (onDateChange) {
      onDateChange(updatedDate); // 변경된 날짜 전달
    }
  };

  const navigateToCalendar = () => {
    navigation.navigate("Calendar", { selectedDate }); // Calendar 화면으로 이동, 선택된 날짜 전달
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => updateDate(-1)}>
        <Icon name="chevron-back-outline" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToCalendar}>
        <Text style={styles.dateText}> {selectedDate} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateDate(1)}>
        <Icon name="chevron-forward-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    position: "absolute",
    top: 0,
  },
  dateText: {
    color: "#FFF",
    fontSize: 25,
  },
});

export default DateNavigator;
