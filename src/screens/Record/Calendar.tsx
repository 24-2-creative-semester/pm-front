import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/types';

type CalendarNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

interface WeightData {
  labels: string[];
  datasets: Array<{ data: number[]; color: (opacity?: number) => string; strokeWidth: number }>;
}

const WeightCalendarScreen = () => {
  const navigation = useNavigation<CalendarNavigationProp>();
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
      const response = await fetch(`/monthweight?today=${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`, // Add token to headers
        },
      });
      const data = await response.json();

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

    const midMonthDate = `${selectedMonth}-15`;
    fetchWeightData(midMonthDate);
  };

  const handleDayPress = (day: { dateString: string }) => {
    // 특정 날짜 클릭 시 DietMain으로 이동하며 선택된 날짜 전달
    navigation.navigate('DietMain',{ date: day.dateString });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress} // 날짜 클릭 이벤트 연결
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
