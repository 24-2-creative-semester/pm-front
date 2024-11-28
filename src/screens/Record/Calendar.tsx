import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WeightData {
  labels: string[];
  datasets: Array<{ data: number[]; color: (opacity?: number) => string; strokeWidth: number }>;
}

const WeightCalendarScreen = () => {
  const [currentMonth, setCurrentMonth] = useState<string>('2024-11');
  const [weightData, setWeightData] = useState<WeightData>({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(124, 119, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  });

  const [markedDates, setMarkedDates] = useState<Record<string, { selected: boolean; selectedColor: string }>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchWeightData = async (date: string) => {
    setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log(date);
      const response = await fetch(`http://172.16.86.241:8080/monthweight?today=${date}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
          Authorization: `${accessToken}`, // Add token to headers
         },
      });
      const data = await response.json();
      console.log(data);

      if (data.isSuccess) {
        const newMarkedDates: Record<string, { selected: boolean; selectedColor: string }> = {};
        const newLabels: string[] = [];
        const newData: number[] = [];

        data.result.forEach((entry: { date: string; memberWeight: number }) => {
          newMarkedDates[entry.date] = { selected: true, selectedColor: '#7c77ff' };
          newLabels.push(entry.date.slice(8, 10) + '일');
          newData.push(entry.memberWeight);
        });

        setMarkedDates(newMarkedDates);
        setWeightData({
          labels: newLabels,
          datasets: [
            {
              data: newData,
              color: (opacity = 1) => `rgba(124, 119, 255, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        });
      }
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD 형식)
    fetchWeightData(today);
  }, []);

  const handleMonthChange = (month: { dateString: string }) => {
    const selectedMonth = month.dateString.slice(0, 7); // YYYY-MM 형식
    setCurrentMonth(selectedMonth);

    // 선택된 월의 15일 계산
    const midMonthDate = `${selectedMonth}-15`;
    fetchWeightData(midMonthDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onMonthChange={handleMonthChange} // 월 변경 이벤트 연결
        theme={{
          backgroundColor: '#1a1a1a',
          calendarBackground: '#1a1a1a',
          textSectionTitleColor: '#ffffff',
          dayTextColor: '#ffffff',
          monthTextColor: '#ffffff',
          arrowColor: '#7c77ff',
          selectedDayBackgroundColor: '#7c77ff',
          selectedDayTextColor: '#ffffff',
        }}
        style={styles.calendar}
      />

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          {currentMonth.slice(0, 4)}년 {currentMonth.slice(5, 7)}월 몸무게 변화
        </Text>
        {isLoading ? (
          <Text style={styles.loadingText}>데이터 로딩 중...</Text>
        ) : weightData.labels.length > 0 ? (
          <LineChart
            data={weightData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#1a1a1a',
              backgroundGradientTo: '#1a1a1a',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#7c77ff',
              },
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={styles.noDataText}>표시할 데이터가 없습니다.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 10,
    alignItems: 'center',
  },
  monthText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 20,
  },
  chartTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  chart: {
    borderRadius: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WeightCalendarScreen;
