//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';

// create a component
const SimpleButton = ({label, style, loading = false, onPress}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={[styles.container, style, {opacity: loading ? 0.8 : 1}]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={'#fff'} />
      ) : (
        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f96331',
    borderRadius: 50,
  },
});

//make this component available to the app
export default SimpleButton;
