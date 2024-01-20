//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import WebView from 'react-native-webview';

// create a component
const Community = () => {
  return (
    <View style={styles.container}>
      <Heading>Community</Heading>
      <WebView
        source={{uri: 'https://foodingredientawareness.beehiiv.com/subscribe'}}
        style={{flex: 1}}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default Community;
