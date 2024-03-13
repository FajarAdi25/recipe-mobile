import React, { useState, useEffect } from 'react';
import { API_URL, API_TOKEN } from '@env';
import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
// import CardRecipe from '../../components/module/CardRecipe'
import CardRecipe from '../../components/module/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyRecipe = ({ navigation }) => {
  const [user, setUser] = React.useState('');
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const users_id = await AsyncStorage.getItem('users_id');
        const response = await axios.get(
          `${API_URL}/users/recipes/${users_id}`,
        );
        console.log(response.data.rows[0]);
        setUser(response.data.rows[0]);

        const recipeResponse = await axios.get(
          `${API_URL}/recipes/users/${users_id}`,
        );
        console.log(recipeResponse.data.data.rows);
        setRecipes(recipeResponse.data.data.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem('userRecipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleDelete = async recipeId => {
    try {
      console.log('Deleting recipe with ID:', recipeId);

      const response = await axios.delete(
        `${API_URL}/recipes/hapusproduct/${recipeId}`,
      );

      console.log('Delete response:', response);

      const updatedRecipe = recipes.filter(
        item => item.recipes_id !== recipeId,
      );
      setRecipes(updatedRecipe);
      console.log('Recipe deleted successfully');
      Alert.alert('Status', 'Delete Recipe Success');
    } catch (error) {
      console.error('Failed to delete recipe', error);
      Alert.alert('Status', 'Failed Delete Recipe');
    }
  };

  return (
    <ScrollView style={{ width: '100%', marginBottom: 30 }}>
      <FlatList
        data={recipes}
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
                uri={item.image}
                foodName={item.food_name}
                store={user.user_name}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButtonContainer}
              onPress={() =>
                navigation.navigate('UpdateRecipe', {
                  item,
                })
              }>
              <View style={styles.editButton}>
                <MaterialCommunityIcons
                  name="lead-pencil"
                  size={24}
                  color="#EEC302"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButtonContainer}
              onPress={() => handleDelete(item.recipes_id)}>
              <View style={styles.deleteButton}>
                <MaterialCommunityIcons name="delete" size={24} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingLeft: 24,
  },
  title: {
    marginLeft: 88,
    color: '#EEC302',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 2,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  editButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 50,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#EEC302',
    padding: 8,
    borderRadius: 5,
  },
});

export default MyRecipe;
