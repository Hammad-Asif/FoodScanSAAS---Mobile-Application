//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

// create a component
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}>
      <Image
        source={require('../assets/images/back.png')}
        style={{width: 25, height: 25}}
      />
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#fff',
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
    top: 10,
    left: 10,
    zIndex: 10,
  },
});

//make this component available to the app
export default BackButton;
