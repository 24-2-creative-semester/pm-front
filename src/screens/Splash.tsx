import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PM</Text>
      <Text style={styles.subtitle}>당신만을 위한 건강</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1B20',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#6F6CFF',
  },
  subtitle: {
    fontSize: 20,
    color: '#6F6CFF',
  },
});

export default Splash;
