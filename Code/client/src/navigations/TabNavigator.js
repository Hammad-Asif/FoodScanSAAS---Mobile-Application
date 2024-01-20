import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import History from '../screens/history';
import Community from '../screens/community';
import Profile from '../screens/profile';
import {Image} from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: '#f96331',
        tabBarInactiveTintColor: '#c2c1e1',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/home.png')}
              style={{tintColor: color, width: 25, height: 25}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/history.png')}
              style={{tintColor: color, width: 25, height: 25}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/community.png')}
              style={{tintColor: color, width: 25, height: 25}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/images/profile.png')}
              style={{tintColor: color, width: 25, height: 25}}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
