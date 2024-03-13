import { View, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import splashScreen from '../../assets/images/launch_screen.png';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={splashScreen}
        resizeMode="cover"
        alt="background"></ImageBackground>
    </View>
  );
};

export default Splash;
