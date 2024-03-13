/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { API_URL, API_TOKEN } from '@env';

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../config/api';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Image } from 'react-native-svg';
import LikeSave from '../../components/module/ButtonSaveLike';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ingredients from '../../components/template/Ingredients';
import VideoStep from '../../components/template/VideoStep';

const Recipe = ({ navigation, route }) => {
  const { recipes_id } = route.params;
  const [recipes, setRecipes] = React.useState('');
  const [usersId, setUsersId] = React.useState('');
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('ingredient');

  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_URL}/recipes/${recipes_id}`);
        console.log(response.data.data.rows);
        setRecipes(response.data.data.rows[0]);
      } catch (error) {
        console.log('Failed to get recipes:', error);
      }
    };
    fetchRecipe();
  }, [recipes_id]);

  React.useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userIdValue = await AsyncStorage.getItem('users_id');
        console.log(userIdValue);
        if (userIdValue !== null) {
          setUsersId(userIdValue);
        }
      } catch (error) {
        console.log('Error retrieving users_id:', error);
      }
    };

    fetchUserId();
  }, []);

  console.log('recipesId :', recipes_id);
  const handleClickSave = async () => {
    try {
      if (isSaved) {
        const response = await axios.delete(
          `${API_URL}/saved/unsaved/${usersId}`,
          {
            data: {
              recipes_id: recipes_id,
            },
          },
        );
        console.log('Unsaved Recipe', response);
      } else {
        const response = await axios.post(
          `${API_URL}/saved/insert/${usersId}`,
          {
            recipes_id: recipes_id,
          },
        );
        console.log('Saved Recipe', response);
      }

      setIsSaved(!isSaved);
    } catch (error) {
      console.log(('Error Saving/Unsaving Recipe', error));
    }
  };
  const handleClickLike = async () => {
    try {
      if (isLiked) {
        const response = await axios.delete(
          `${API_URL}/liked/unlike/${usersId}`,
          {
            data: {
              recipes_id: recipes_id,
            },
          },
        );
        console.log('unliked recipe', response);
      } else {
        const response = await axios.post(
          `${API_URL}/liked/insert/${usersId}`,
          {
            recipes_id: recipes_id,
          },
        );
        console.log('Liked Recipe', response);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log('Error Like / Unlike Recipe', error);
    }
  };
  return (
    <View>
      <ImageBackground
        source={{ uri: recipes.image }}
        style={{
          width: '100%',
          height: 450,
          borderRadius: 10,
          position: 'relative',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              fontSize: 35,
              color: 'grey',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            position: 'absolute',
            bottom: 60,
            left: 20,
            width: 250,
            fontSize: 24,
            color: 'black',
            fontWeight: 700,
          }}>
          {recipes.food_name}
        </Text>
        <Text
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            width: 250,
            fontSize: 14,
            color: 'black',
            fontWeight: 600,
          }}>
          By Fajar
        </Text>
        <View style={styles.likeSave}>
          <LikeSave
            isSaved={isSaved}
            isLiked={isLiked}
            onPressLiked={handleClickLike}
            onPressSaved={handleClickSave}
          />
        </View>
      </ImageBackground>

      <View
        style={{
          marginTop: -10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: 'white',
        }}>
        <View style={{ margin: 30 }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 40 }}>
            <TouchableOpacity onPress={() => setActiveTab('ingredient')}>
              <Text
                style={[
                  activeTab === 'ingredient'
                    ? {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#18172B',
                        borderBottomWidth: 2,
                        borderBottomColor: '#EFC81A',
                      }
                    : { fontWeight: 'bold', fontSize: 20 },
                ]}>
                Ingredients
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab('video')}>
              <Text
                style={[
                  activeTab === 'video'
                    ? {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#18172B',
                        borderBottomWidth: 2,
                        borderBottomColor: '#EFC81A',
                      }
                    : { fontWeight: 'bold', fontSize: 20 },
                ]}>
                Video
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content Tab Ingredients */}
          {activeTab === 'ingredient' && (
            <View style={{ height: 290, marginTop: 20 }}>
              <ScrollView style={{ backgroundColor: '#FAF7ED' }}>
                <Text>{recipes.ingredients}</Text>
              </ScrollView>
            </View>
          )}

          {/* Content Tab Video */}
          {activeTab === 'video' && (
            <ScrollView style={{ height: 290, marginTop: 20 }}>
              <View style={{ backgroundColor: '#FAF7ED', borderRadius: 15 }}>
                <View
                  style={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('VideoRecipe', {
                        recipes_id: recipes.recipes_id,
                      })
                    }
                    style={{
                      flexBasis: 60,
                      height: 60,
                      backgroundColor: '#EEC302',
                      borderRadius: 16,
                      margin: 10,
                    }}>
                    <Feather
                      name="play"
                      style={{
                        fontSize: 30,
                        color: 'white',
                        marginLeft: 16,
                        marginTop: 15,
                      }}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={{ fontSize: 20 }}> {recipes.title} </Text>
                  </View>
                </View>
              </View>

              <TextInput
                editable
                multiline
                numberOfLines={10}
                maxLength={40}
                placeholder="Comment : "
                style={{
                  textAlignVertical: 'top',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  width: '100%',
                  padding: 20,
                  borderWidth: 1,
                  marginTop: 20,
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: '#EEC302',
                  marginTop: 20,
                  marginBottom: 50,
                  height: 50,
                  borderRadius: 10,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  Post Comment
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  product: {
    height: '60%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 133,
    left: 28,
    right: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeSave: {
    paddingTop: 50,
  },
  foodDetail: {
    width: 200,
  },
  foodName: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },
  author: {
    color: 'white',
    fontSize: 12,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  card: {
    flex: 1,
    padding: 15,
  },
});
