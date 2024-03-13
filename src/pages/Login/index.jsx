/* eslint-disable semi */
import { API_URL, API_TOKEN } from '@env';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Button from 'react-native-button';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [data, setData] = React.useState({
    email_address: '',
    password: '',
  });

  const handleLogin = async () => {
    axios
      .post(`${API_URL}/login`, data)
      .then(response => {
        // console.log('Response data: ', response.data);
        if (response.data && response.data.userId) {
          // console.log('User ID: ', response.data.userId);
          AsyncStorage.setItem('users_id', response.data.userId.toString())
            .then(() => {
              Alert.alert('Success', 'Login Success');
            })
            .catch(error => {
              Alert.alert('Login Failed', 'Incorrect Email or Password !');
              // console.log('Failed to save users_id: ', error);
            });
          navigation.navigate('BottomTabs');
        } else {
          Alert.alert('Login Failed', 'Incorrect Email or Password !');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/potoprofil.png')}
        />
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.text}>Log in to your existing account.</Text>
        <TextInput
          style={styles.input}
          placeholder="examplexxx@gmail.com"
          value={data.email_address}
          onChangeText={text => setData({ ...data, email_address: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={data.password}
          onChangeText={text => setData({ ...data, password: text })}
        />
        <Text style={styles.forgot}>Forgot Password?</Text>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={styles.signup}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 24,
  },
  input: {
    height: 60,
    borderColor: '#E5E5E5',
    backgroundColor: '#E5E5E5',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 56,
    marginHorizontal: 28,
    borderRadius: 10,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: '#EFC81A',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#C4C4C4',
    marginBottom: 40,
  },
  forgot: {
    textAlign: 'right',
    paddingRight: 28,
    marginTop: -8,
    color: '#999999',
  },
  button: {
    backgroundColor: '#EFC81A',
    height: 50,
    marginHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signup: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999999',
  },
  signupText: {
    color: '#EFC81A',
    fontWeight: 'bold',
  },
});
