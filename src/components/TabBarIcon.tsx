import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface TabBarIconProps {
  focused: boolean;
  icon: any;
  label: string;
}

const TabBarIcon = ({ focused, icon, label }: TabBarIconProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={[
          styles.icon,
          { tintColor: focused ? '#6F6DFF' : '#777' }, // 활성화 여부에 따른 색상
        ]}
      />
      <Text
        style={[
          styles.label,
          { color: focused ? '#6F6DFF' : '#777' }, // 활성화 여부에 따른 색상
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default TabBarIcon;
