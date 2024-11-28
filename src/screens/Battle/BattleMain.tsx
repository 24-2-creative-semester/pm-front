import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/types';// RootStackParamList를 정의한 경로

type BattleHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BattleMain'>;

const BattleMain: React.FC = () => {
  const navigation = useNavigation<BattleHomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1:1 대결</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.battleButton} onPress={() => navigation.navigate('BattleCreate')}>
          <Text style={styles.buttonText}>대결 생성</Text>
          <Icon name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.battleButton} onPress={() => navigation.navigate('BattleParticipate')}>
          <Text style={styles.buttonText}>대결 참가</Text> 
          <Icon name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.listButton} onPress={() => navigation.navigate('BattleList')}>
        <Text style={styles.listButtonText}>대결 목록  </Text>
        <Icon name="arrow-forward" size={24} color="#7c77ff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  battleButton: {
    backgroundColor: '#7c77ff',
    padding: 20,
    borderRadius: 10,
    width: 140,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
  },
  listButton: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listButtonText: {
    color: '#7c77ff',
    fontSize: 16,
  },
});

export default BattleMain;
