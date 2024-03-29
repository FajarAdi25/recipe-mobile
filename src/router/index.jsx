import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import BottomTabs from '../components/template/ButtonTabs';
import Category from '../pages/Home/category';
import EditProfile from '../pages/Profile/edit';
import LikedRecipe from '../pages/Profile/likedRecipe';
import MyRecipe from '../pages/Profile/myRecipe';
import SavedRecipe from '../pages/Profile/savedRecipe';
import DetailRecipe from '../pages/DetailRecipe';
import VideoRecipe from '../pages/DetailRecipe/video';
import UpdateRecipe from '../pages/DetailRecipe/update';
import Splash from '../pages/Splash';
import Ingredients from '../components/template/Ingredients';
import VideoStep from '../components/template/VideoStep';

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerTitle: '', headerTransparent: true }}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            title: 'Popular Menu',
            headerTitleStyle: {
              color: '#EEC302',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'Edit Profile',
            headerTitleStyle: {
              color: '#EEC302',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="MyRecipe"
          component={MyRecipe}
          options={{
            title: 'My Recipe',
            headerTitleStyle: {
              color: '#EEC302',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="SavedRecipe"
          component={SavedRecipe}
          options={{
            title: 'Saved Recipe',
            headerTitleStyle: {
              color: '#EEC302',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="LikedRecipe"
          component={LikedRecipe}
          options={{
            title: 'Liked Recipe',
            headerTitleStyle: {
              color: '#EEC302',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DetailRecipe"
          component={DetailRecipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ingredients" component={Ingredients} />
        <Stack.Screen name="VideoStep" component={VideoStep} />

        <Stack.Screen
          name="VideoRecipe"
          component={VideoRecipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateRecipe"
          component={UpdateRecipe}
          options={{
            title: 'Update Recipe',
            headerTitleStyle: {
              color: '#EEC302',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
