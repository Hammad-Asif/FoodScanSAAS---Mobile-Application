//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Home from '../screens/home';
import History from '../screens/history';
import Community from '../screens/community';
import Profile from '../screens/profile';

const Drawer1 = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer1.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: {marginLeft: -20, fontSize: 15},
        drawerActiveTintColor: '#f96331',
        drawerInactiveTintColor: 'gray',
        drawerActiveBackgroundColor: '#fff',
        presentation: 'modal',
      }}>
      <Drawer1.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color, size}) => (
            <View style={{width: 30, alignItems: 'center'}}>
              <Image
                source={require('../assets/images/home.png')}
                style={{tintColor: color, width: 20, height: 20}}
              />
            </View>
          ),
        }}
      />
      <Drawer1.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({color, size}) => (
            <View style={{width: 30, alignItems: 'center'}}>
              <Image
                source={require('../assets/images/history.png')}
                style={{tintColor: color, width: 20, height: 20}}
              />
            </View>
          ),
        }}
      />
      <Drawer1.Screen
        name="Community"
        component={Community}
        options={{
          drawerIcon: ({color, size}) => (
            <View style={{width: 30, alignItems: 'center'}}>
              <Image
                source={require('../assets/images/community.png')}
                style={{tintColor: color, width: 20, height: 20}}
              />
            </View>
          ),
        }}
      />

      <Drawer1.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color, size}) => (
            <View style={{width: 30, alignItems: 'center'}}>
              <Image
                source={require('../assets/images/profile.png')}
                style={{tintColor: color, width: 20, height: 20}}
              />
            </View>
          ),
        }}
      />
    </Drawer1.Navigator>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default DrawerNavigator;
