//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import RootStack from './src/navigations/RootStack';
import FlashMessage from 'react-native-flash-message';
import Auth from './src/context/Auth';

// create a component
const App = () => {
  return (
    <View style={styles.container}>
      <Auth>
        <RootStack />
        <FlashMessage position="top" />
      </Auth>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
