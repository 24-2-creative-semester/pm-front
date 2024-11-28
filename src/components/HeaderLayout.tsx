import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import DateNavigator from "./datenavigator";
import RecordTabSelector from "./RecordTabSelector";

interface HeaderLayoutProps {
  selectedDate?: string; // 선택적 속성
  onDateChange?: (date: string) => void; // 선택적 속성
  children: ReactNode;
}


const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  selectedDate,
  onDateChange,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {selectedDate && onDateChange && (
          <DateNavigator initialDate={selectedDate} onDateChange={onDateChange} />
        )}
      </View>
      <View style={styles.tabs}>
        <RecordTabSelector />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    alignItems: "center",
    marginTop: 10,
  },
  tabs: {
    marginTop: 30,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default HeaderLayout;
