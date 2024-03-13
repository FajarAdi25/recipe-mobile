import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL, API_TOKEN } from '@env';
import CardRecipe from '../../components/module/Card';

const SavedRecipe = ({ navigation }) => {
  const [savedRecipe, setSavedRecipe] = React.useState([]);

  React.useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const users_id = await AsyncStorage.getItem('users_id');
        const response = await axios.get(`${API_URL}/saved/users/${users_id}`);
        setSavedRecipe(response.data.message.rows);
        console.log('saved recipe', response.data.message.rows);
      } catch (error) {
        console.log('failed to fetchSavedRecipes', error);
      }
    };
    fetchSavedRecipes();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={savedRecipe}
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
                // foodCategory="Spicy"
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

export default SavedRecipe;
