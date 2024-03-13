import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CardCategory = ({ iconName, iconColor, backgroundColor, ...props }) => {
  return (
    <View style={[styles.category, { backgroundColor: backgroundColor }]}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name={iconName} size={26} color={iconColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});

export default CardCategory;
