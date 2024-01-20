//import liraries
import React, {  Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Heading = ({children}) => {
    return (
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f96331', padding: 15, elevation: 1, backgroundColor: '#fff'}}>{children}</Text>
    );
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default Heading;
