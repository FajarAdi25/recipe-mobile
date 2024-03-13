import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react';
import CardRecipe from '../../components/module/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL, API_TOKEN } from '@env';

const LikedRecipe = ({ navigation }) => {
  const [likedRecipe, setLikedRecipe] = React.useState([]);

  React.useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        const users_id = await AsyncStorage.getItem('users_id');
        const response = await axios.get(`${API_URL}/liked/users/${users_id}`);
        setLikedRecipe(response.data.message.rows);
        console.log('liked recipe', response.data.message.rows);
      } catch (error) {
        console.log('failed to fetchLikedRecipes', error);
      }
    };
    fetchLikedRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={likedRecipe}
        keyExtractor={item => item.recipes_id}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailRecipe', {
                  recipes_id: item.recipes_id,
                })
              }>
              <CardRecipe
                uri={item.recipe_image}
                foodName={item.food_name}
                store={item.user_name}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
    paddingTop: 35,
  },
});

export default LikedRecipe;
