/* eslint-disable indent */
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
} from 'react-native';
import Button from 'react-native-button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Update = ({ navigation, route }) => {
  const { item } = route.params;
  const [title, setTitle] = useState(item.food_name);
  const [ingredient, setIngredient] = useState(item.ingredients);
  const [videoTitle, setVideoTitle] = useState(item.video_title);
  const [videoLink, setVideoLink] = useState(item.video);
  const [response, setResponse] = useState(null);

  const galleryLaunch = () => {
    launchImageLibrary(
      {
        saveToPhotos: true,
        mediaType: 'mixed',
        includeBase64: false,
      },
      res => {
        // console.log('response camera = ', res);
        if (res.didCancel) {
          // console.log('User cancel Image');
        } else if (res.errorMessage) {
          // console.log('Image Picker Error');
        } else {
          const data = res.assets[0];
          setResponse(data);
          // console.log(setResponse);
        }
      },
    );
  };

  const handleSubmit = async () => {
    let image;
    response
      ? (image = {
          uri: response?.uri ?? '',
          type: response?.type ?? '',
          name: response?.fileName ?? '',
          fileSize: response?.fileSize ?? '',
        })
      : (image = null);

    const data = {
      user_id: item.users_id,
      food_name: title,
      ingredients: ingredient,
      image,
      video_title: videoTitle,
      video: videoLink,
    };

    const formData = new FormData();
    formData.append('users_id', data.users_id);
    formData.append('food_name', data.food_name);
    formData.append('ingredients', data.ingredients);
    formData.append('image', data.image);
    formData.append('video_title', data.video_title);
    formData.append('video', data.video);

    axios
      .put(`${API_URL}/recipes/updateproduct/${item.recipes_id}`, formData, {
        headers: {
          // Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);

        Alert.alert('Status', 'Update Recipe Success');

        navigation.navigate('Profile');

        setTitle('');
        setIngredient('');
        setResponse(null);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    // <ScrollView>
    //   <View style={s.container}>
    //     <Text style={s.title}>Update Your Recipe</Text>
    //     <TextInput
    //       style={s.input}
    //       onChangeText={setTitle}
    //       value={title}
    //       placeholder="Title"
    //     />

    //     <TextInput
    //       editable
    //       multiline
    //       numberOfLines={10}
    //       onChangeText={text => setIngredient(text)}
    //       value={ingredient}
    //       placeholder="Ingredient"
    //       style={{
    //         textAlignVertical: 'top',
    //         backgroundColor: 'white',
    //         borderRadius: 10,
    //         width: '100%',
    //         paddingVertical: 20,
    //         paddingHorizontal: 40,
    //       }}
    //     />

    //     <TouchableOpacity
    //       style={{
    //         height: 60,
    //         width: '100%',
    //         backgroundColor: 'white',
    //         borderRadius: 10,
    //         paddingVertical: 20,
    //         paddingHorizontal: 40,
    //         margin: 12,
    //       }}
    //       onPress={() => galleryLaunch()}>
    //       <Text style={{ color: '#ababab' }}>Change Image</Text>
    //     </TouchableOpacity>

    //     <View style={{ marginTop: 10 }}>
    //       <Image
    //         style={{ width: 120, height: 120 }}
    //         resizeMode="cover"
    //         source={response ? { uri: response.uri } : { uri: pImage }}
    //       />
    //     </View>

    //     <TextInput
    //       style={s.input}
    //       onChangeText={setVideoLink}
    //       value={videoLink}
    //       placeholder="Video link"
    //     />

    //     <Button
    //       style={{
    //         height: 60,
    //         width: 200,
    //         borderRadius: 10,
    //         backgroundColor: '#EFC81A',
    //         color: 'white',
    //         paddingTop: 17,
    //         marginVertical: 50,
    //       }}
    //       onPress={() => handleSubmit()}>
    //       UPDATE
    //     </Button>
    //   </View>
    // </ScrollView>
    <ScrollView>
      <View>
        <Text style={styles.headers}>Update Recipe</Text>
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
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          editable
          multiline
          placeholder="Ingredient"
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => setIngredient(text)}
          value={ingredient}
          style={styles.ingredient}
        />
        <TextInput
          style={styles.video}
          placeholder="Name Video"
          onChangeText={text => setVideoTitle(text)}
          value={videoTitle}
        />
        <TextInput
          style={styles.video}
          placeholder="Add Video URL"
          onChangeText={text => setVideoLink(text)}
          value={videoLink}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>UPDATE</Text>
      </TouchableOpacity>
      <View style={{ paddingBottom: 50 }} />
    </ScrollView>
  );
};

export default Update;

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
