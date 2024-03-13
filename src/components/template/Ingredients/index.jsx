/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Ingredients = ({ ingredients }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailIngredients}>
        <Text style={styles.ingredients}>{ingredients}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  detailIngredients: {
    padding: 10,
    backgroundColor: '#FAF7ED',
    borderRadius: 15,
  },
  ingredients: {
    fontSize: 14,
    width: 220,
  },
});

export default Ingredients;
