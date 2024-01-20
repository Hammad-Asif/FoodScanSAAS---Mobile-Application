//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';

// create a component
const SearchHeader = ({onSearch, query}) => {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
      <View style={styles.searchBarContainer}>
        <Image
          source={require('../assets/images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'gray'}
          style={styles.searchInput}
          value={query}
          onChangeText={onSearch}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('BarCodeScanner')}
        style={{marginLeft: 10}}>
        <Image
          source={require('../assets/images/barCodeScanner.png')}
          style={{width: 35, height: 35}}
        />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    height: 45,
    borderRadius: 7,
    alignItems: 'center',
    padding: 10,
  },
  searchIcon: {width: 20, height: 20, marginRight: 10, tintColor: 'gray'},
  searchInput: {flex: 1, padding: 0, fontSize: 15, color: '#000'},
});

//make this component available to the app
export default SearchHeader;
