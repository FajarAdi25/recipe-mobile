import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { API_URL, API_TOKEN } from '@env';
import React, { useState, useEffect } from 'react';
import CardCategory from '../../components/module/CardCategory';
import CardImage from '../../components/module/CardImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [data, setData] = React.useState('');
  React.useEffect(() => {
    axios
      .get(`${API_URL}/recipes`)
      .then(response => {
        setData(response.data.result.result.rows);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    console.log('Navigating to Search');
    navigation.navigate('Search');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.search}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search Pasta, Bread, etc"
              onPressIn={handleSearch}
            />
            <TouchableOpacity style={styles.icon} onPress={handleSearch}>
              <Icon name="search" size={20} color={'#EEC302'} />
            </TouchableOpacity>
          </View>
          <View style={styles.newRecipe}>
            <Text style={styles.sectionText}>New Recipes</Text>
            <ScrollView style={styles.content}>
              <FlatList
                horizontal
                data={data}
                keyExtractor={item => item.recipes_id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailRecipe', {
                        recipes_id: item.recipes_id,
                      })
                    }>
                    <CardImage uri={item.image} text={item.food_name} />
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
          <View style={styles.popularRecipe}>
            <View style={styles.popularRecipeText}>
              <Text style={styles.sectionText}>Popular Recipes</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Category')}
                style={styles.section}>
                <Text style={styles.sectionInfo}>More Info</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.category}>
              <CardCategory
                backgroundColor="#FDE901"
                iconName="silverware-fork-knife"
                iconColor="#000"
              />
              <View style={styles.details}>
                <View>
                  <Text style={styles.foodName}>Orange La Pasta</Text>
                </View>
                <View style={styles.rating}>
                  <MaterialCommunityIcons
                    name="star"
                    size={12}
                    color="#FFB200"
                  />
                  <Text style={styles.rate}>4.6 - </Text>
                  <Text style={styles.foodCategory}>Pasta</Text>
                </View>
              </View>
            </View>
            <View style={styles.category}>
              <CardCategory
                backgroundColor="#57CE96"
                iconName="pot-steam"
                iconColor="#000"
              />
              <View style={styles.details}>
                <View>
                  <Text style={styles.foodName}>Spicy Ramenyu</Text>
                </View>
                <View style={styles.rating}>
                  <MaterialCommunityIcons
                    name="star"
                    size={12}
                    color="#FFB200"
                  />
                  <Text style={styles.rate}>4.4 - </Text>
                  <Text style={styles.foodCategory}>Korean</Text>
                </View>
              </View>
            </View>
            <View style={styles.category}>
              <CardCategory
                backgroundColor="#000001"
                iconName="fish"
                iconColor="#000"
              />
              <View style={styles.details}>
                <View>
                  <Text style={styles.foodName}>Lobster Toast</Text>
                </View>
                <View style={styles.rating}>
                  <MaterialCommunityIcons
                    name="star"
                    size={12}
                    color="#FFB200"
                  />
                  <Text style={styles.rate}>4.4 - </Text>
                  <Text style={styles.foodCategory}>Seafood</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    padding: 25,
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 45,
    left: 15,
  },
  searchBar: {
    marginTop: 30,
    width: '100%',
    borderRadius: 15,
    paddingLeft: 48,
    height: 50,
    backgroundColor: '#EFEFEF',
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  // container: { flex: 1, padding: 25, marginTop: 16, backgroundColor: '#fff' },
  newRecipe: { marginTop: 41 },
  sectionText: { fontSize: 18, fontWeight: 'bold', color: '#3F3A3A' },
  content: { marginTop: 10 },
  popularRecipe: { marginTop: 30 },
  popularRecipeText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionInfo: { color: '#6D61F2' },
  category: {
    marginTop: 30,
    flexDirection: 'row',
    columnGap: 5,
  },
  details: {
    justifyContent: 'center',
    gap: 10,
    marginLeft: 5,
  },
  foodName: { fontSize: 18, color: '#18172B', fontWeight: 'bold' },
  rating: { flexDirection: 'row' },
  rate: { color: '#18172B', fontWeight: 'bold' },
});
