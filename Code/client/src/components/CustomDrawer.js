import React, {useState, useEffect, useContext} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../context/AuthGlobal';

function CustomDrawer(props) {

  const {user, setUser} = useContext(AuthGlobal);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={{width: 80, height: 80}}/>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            color: "#000",
            marginTop: 10,
            marginLeft: 10
          }}>
          Food {'\n'}Scanner
        </Text>
      </View>
      <View style={styles.footer}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />

          <TouchableOpacity onPress={handleLogout} style={{flexDirection: 'row', paddingLeft: 18, marginTop: 13}}>
            <View style={{width: 32, alignItems: 'center'}}>
              <Image source={require('../assets/images/logout.png')} style={{ width: 23, height: 23, tintColor: 'gray'}}/>
            </View>
            <Text
              style={{
                paddingLeft: 12,
                fontFamily: 'Poppins-Medium',
                fontSize: 15,
                color: '#757575',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  footer: {
    flex: 1.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

export default CustomDrawer;
