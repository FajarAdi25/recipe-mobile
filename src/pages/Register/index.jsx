import React, { useState } from 'react';
import { API_URL, API_TOKEN } from '@env';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from 'react-native-button';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [data, setData] = React.useState({
    name: '',
    email_address: '',
    phone_number: '',
    password: '',
  });

  const handleChange = (field, text) => {
    setData({
      ...data,
      [field]: text,
    });
  };

  const handleRegister = () => {
    if (data.password !== data.confirmPassword) {
      console.log('Passwords do not match');
      Alert.alert('Passwords do not match');
      return;
    }
    axios
      .post(`${API_URL}/register`, data)
      .then(response => {
        console.log(response);
        Alert.alert('Sign Up Success', 'Please Login');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Sign Up Failed', 'Please Re Sign Up');
      });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            style={styles.back}
            source={require('../../assets/images/arrow-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.welcome}>Let’s Get Started !</Text>
        <Text style={styles.text}>
          Create new account to access all features
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={data.name}
          onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={data.email_address}
          onChangeText={text => handleChange('email_address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={data.phone_number}
          onChangeText={text => handleChange('phone_number', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Create New Password"
          value={data.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CREATE</Text>
        </TouchableOpacity>
        <Text style={styles.signup}>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupText}>Log in Here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginVertical: 13,
  },
  back: {
    marginLeft: 28,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: '#EFC81A',
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#C4C4C4',
    marginBottom: 40,
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
