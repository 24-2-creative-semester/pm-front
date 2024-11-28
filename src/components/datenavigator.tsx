import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface DateNavigatorProps {
  initialDate?: string; // 초기 날짜를 전달받을 수 있도록 설정
  onDateChange?: (date: string) => void; // 날짜가 변경될 때 실행될 콜백
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  initialDate,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    initialDate || new Date().toISOString().split("T")[0]
  );

  const updateDate = (days: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days); // 날짜 변경
    const updatedDate = currentDate.toISOString().split("T")[0];
    setSelectedDate(updatedDate);
    if (onDateChange) {
      onDateChange(updatedDate); // 변경된 날짜 전달
    }
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => updateDate(-1)}>
        <Icon name="chevron-back-outline" size={32} color="red" />
      </TouchableOpacity>
      <Text style={styles.dateText}>    {selectedDate}    </Text>
      <TouchableOpacity onPress={() => updateDate(1)}>
        <Icon name="chevron-forward-outline" size={32} color="red" />
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
      // marginHorizontal: 33,
      position: 'absolute', // 부모 컨테이너 기준으로 고정
      top: 0, // 화면 상단에 붙이기
   },
  dateText: {
    color: "#FFFFFF",
      fontSize: 28,
  },
});

export default DateNavigator;