/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardRecipe from '../../module/Card';
import { CheckBox } from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const LikeSave = ({ isLiked, isSaved, onPressLiked, onPressSaved }) => {
  const [checkedLike, setCheckedLike] = React.useState(false);
  return (
    <View style={styles.container}>
      <CheckBox
        checked={isSaved}
        checkedIcon={<FeatherIcon name="bookmark" size={20} color="white" />}
        uncheckedIcon={
          <FeatherIcon name="bookmark" size={20} color="#EFC81A" />
        }
        checkedColor="grey"
        uncheckedColor="#EFC81A"
        onPress={onPressSaved}
        containerStyle={{
          backgroundColor: isSaved ? '#EFC81A' : '#fff',
          borderColor: '#EFC81A',
          borderWidth: 1,
          borderRadius: 20,
        }}
      />
      <CheckBox
        checked={isLiked}
        checkedIcon={<AntDesignIcon name="like2" size={20} color="white" />}
        uncheckedIcon={<AntDesignIcon name="like2" size={20} color="#EFC81A" />}
        onPress={onPressLiked}
        containerStyle={{
          backgroundColor: isLiked ? '#EFC81A' : '#fff',
          borderColor: '#EFC81A',
          borderWidth: 1,
          borderRadius: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 320,
    left: 280,
  },
});
export default LikeSave;
