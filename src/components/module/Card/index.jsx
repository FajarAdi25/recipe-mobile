/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const CardRecipe = ({
  uri,
  foodName,
  store,
  foodCategory,
  onDeletePress,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.category}
        source={{
          uri: uri,
        }}
        // source={require('../../../assets/images/menu/nasi-goreng.jpg')}
      />
      <View style={styles.details}>
        {/* <Text style={styles.foodName}>Nasi Goreng Seafood</Text>
        <Text style={styles.store}>Fajar Adi Prasetio</Text>
        <Text style={styles.foodCategory}>{foodCategory}</Text> */}
        <Text style={styles.foodName}>{foodName}</Text>
        <Text style={styles.store}>{store}</Text>
        <Text style={styles.foodCategory}>{foodCategory}</Text>
      </View>
    </View>
  );
};
export default CardRecipe;
const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 16 },
  category: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  store: {
    fontSize: 12,
    marginTop: 5,
  },
  foodCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginTop: 8,
  },
  icon: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});
