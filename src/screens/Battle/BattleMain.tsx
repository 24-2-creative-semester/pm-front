// Example:
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BattleMain = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>배틀 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default BattleMain;
