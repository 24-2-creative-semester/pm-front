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
        numberOfLines={1} // 한 줄로 제한
        ellipsizeMode="tail" // 텍스트 잘림 방지
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 70,
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default TabBarIcon;
