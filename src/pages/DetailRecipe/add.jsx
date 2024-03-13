import React, { useState } from 'react';
import { API_URL, API_TOKEN } from '@env';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation }) => {
  const [recipes, setRecipes] = React.useState({
    image: '',
    food_name: '',
    ingredients: '',
    video_title: '',
    video: '',
    users_id: '',
  });
  const [response, setResponse] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem('users_id').then(value => {
      setRecipes({ ...recipes, users_id: value });
    });
  }, []);

  const handleChange = (field, text) => {
    setRecipes({
      ...recipes,
      [field]: text,
    });
  };
  console.log(recipes);
  const galleryLaunch = () => {
    launchImageLibrary(
      {
        saveToPhotos: true,
        mediaType: 'mixed',
        includeBase64: false,
      },
      res => {
        // console.log('response camera = ', res)
        if (res.didCancel) {
          // console.log('User cancel Image')
        } else if (res.errorMessage) {
          // console.log('Image Picker Error')
        } else {
          const data = res.assets[0];
          // console.log(data)
          setResponse(data);
        }
      },
    );
  };

  const handleSumbit = () => {
    const formData = new FormData();

    formData.append('food_name', recipes.food_name);
    formData.append('ingredients', recipes.ingredients);
    formData.append('video_title', recipes.video_title);
    formData.append('video', recipes.video);
    formData.append('users_id', recipes.users_id);

    if (response && response.uri) {
      formData.append('image', {
        uri: response?.uri ?? '',
        type: response?.type ?? '',
        name: response?.fileName ?? '',
        fileSize: response?.fileSize ?? '',
      });
    }
    axios
      .post(`${API_URL}/recipes/tambahproduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);
        Alert.alert('Status', 'Add Recipe Success');
        navigation.navigate('MyRecipe');
        setRecipes({
          image: '',
          food_name: '',
          ingredients: '',
          video_title: '',
          video: '',
        });
        setResponse(null);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.headers}>Add Recipe</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            galleryLaunch();
          }}>
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>
      </View>
      {response && (
        <View style={{ marginTop: 10 }}>
          <Image
            style={{
              marginTop: 30,
              marginLeft: 118,
              width: 150,
              height: 150,
            }}
            resizeMode="cover"
            source={{ uri: response.uri }}
          />
        </View>
      )}
      <View>
        <TextInput
          style={styles.title}
          placeholder="Title"
          onChangeText={text => handleChange('food_name', text)}
          value={recipes.food_name}
        />
        <TextInput
          editable
          multiline
          placeholder="Ingredient"
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => handleChange('ingredients', text)}
          value={recipes.ingredients}
          style={styles.ingredient}
        />
        <TextInput
          style={styles.video}
          placeholder="Name Video"
          onChangeText={text => handleChange('video_title', text)}
          value={recipes.video_title}
        />
        <TextInput
          style={styles.video}
          placeholder="Add Video URL"
          onChangeText={text => handleChange('video', text)}
          value={recipes.video}
        />
      </View>
      <TouchableOpacity onPress={handleSumbit} style={styles.button}>
        <Text style={styles.buttonText}>POST</Text>
      </TouchableOpacity>
      <View style={{ paddingBottom: 50 }} />
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  headers: {
    fontSize: 24,
    fontWeight: '500',
    color: '#EFC81A',
    textAlign: 'center',
    marginTop: 40,
  },
  title: {
    marginHorizontal: 28,
    backgroundColor: 'white',
    height: 60,
    borderRadius: 10,
    marginTop: 40,
    paddingLeft: 60,
    color: 'grey',
  },
  ingredient: {
    marginHorizontal: 28,
    backgroundColor: 'white',
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 60,
    color: 'grey',
  },
  video: {
    marginHorizontal: 28,
    backgroundColor: 'white',
    height: 60,
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 60,
    color: 'grey',
  },
  button: {
    backgroundColor: '#EFC81A',
    height: 50,
    marginHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    width: 185,
    marginLeft: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
