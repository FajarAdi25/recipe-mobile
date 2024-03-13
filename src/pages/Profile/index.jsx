/* eslint-disable prettier/prettier */

import * as React from 'react';
import { API_URL, API_TOKEN } from '@env';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = ({ navigation }) => {
  const [user, setUser] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('users_id');
      console.log(userId);
      const response = await axios.get(`${API_URL}/users/${userId}`);
      console.log(response.data.data.rows[0]);
      setUser(response.data.data.rows[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUser()
      .then(() => setRefreshing(false))
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  }, []);

  React.useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    AsyncStorage.removeItem('token')
      .then(() => {
        Alert.alert('Logout Successful');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View>
      <View
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.profile}>
          {user.image === 'null' ? (
            <Image
              source={require('../../assets/images/profile/potoprofil.png')}
              style={styles.photo}
            />
          ) : (
            <Image
              style={styles.photo}
              // source={require('../../assets/images/crop.jpg')}
              source={{
                uri: user.image,
              }}
            />
          )}
          {/* <Image style={styles.photo} source={profileImageSource} /> */}
          {/* <Text style={styles.teks}>Fajar Adi Prasetio</Text> */}
          <Text style={styles.teks}>{user.name}</Text>
        </View>
      </View>
      <View>
        <View style={styles.konten}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditProfile', { userId: user.users_id })
            }
            style={styles.isiKonten}>
            <View
              style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/profile/profile.png')}
              />
              <Text style={{ fontSize: 14 }}>Edit Profile</Text>
            </View>
            <Image source={require('../../assets/images/profile/panah.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyRecipe')}
            style={styles.isiKonten}>
            <View
              style={{ flexDirection: 'row', gap: 18, alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/profile/award.png')}
              />
              <Text style={{ fontSize: 14 }}>My Recipe</Text>
            </View>
            <Image source={require('../../assets/images/profile/panah.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SavedRecipe')}
            style={styles.isiKonten}>
            <View
              style={{ flexDirection: 'row', gap: 25, alignItems: 'center' }}>
              <Image source={require('../../assets/images/profile/save.png')} />
              <Text style={{ fontSize: 14 }}>Saved Recipe</Text>
            </View>
            <Image source={require('../../assets/images/profile/panah.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LikedRecipe')}
            style={styles.isiKonten}>
            <View
              style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
              <Image source={require('../../assets/images/profile/like.png')} />
              <Text style={{ fontSize: 14 }}>Liked Recipe</Text>
            </View>
            <Image source={require('../../assets/images/profile/panah.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={{ fontSize: 18, fontWeight: 700 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: '#EEC302',
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 999,
  },
  konten: {
    backgroundColor: '#FFFFFF',
    height: 512,
    marginHorizontal: 7,
    marginTop: -60,
    borderRadius: 20,
  },
  isiKonten: {
    margin: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  teks: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
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
});

export default Profile;
