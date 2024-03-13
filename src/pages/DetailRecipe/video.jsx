import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { API_URL, API_TOKEN } from '@env';

// import Feather from 'react-native-vector-icons/Feather'

const Video = ({ navigation, route }) => {
  const { recipes_id } = route.params;
  // const recipes_id = recipesId;
  console.log('recipes_id on detail video', recipes_id);
  const dummyVideo =
    'https://res.cloudinary.com/dbrsb2ayy/video/upload/v1709699098/recipe/recipe_video/p8slmlfloutjxzr11d4g.mp4';
  const [recipes, setRecipes] = React.useState('');

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
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Video
          source={{
            uri: recipes.video || dummyVideo,
          }}
          style={{ height: 300, width: '100%' }}
          resizeMode="cover"
          volume={1.0}
          muted={false}
          playInBackground={false}
          controls={true}
        />
      </View>
      <ScrollView style={styles.scrollSection}>
        <View style={styles.videoDetail}>
          <Text style={styles.videoTitle}>{recipes.video_title}</Text>
          <Text style={styles.videoDate}>3 Month Ago</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollSection: {
    padding: 28,
  },
  videoDetail: {
    gap: 8,
  },
  videoTitle: {
    fontSize: 18,
    color: '#000',
  },
  videoDate: {
    fontSize: 12,
    color: '#AAA',
  },
});

export default Video;
