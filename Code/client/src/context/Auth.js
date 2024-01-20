import React, {useEffect, useReducer, useState} from 'react';

import AuthGlobal from './AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const Auth = props => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const checkUser = async () => {
    const getUser = await AsyncStorage.getItem('user');
    let userA = JSON.parse(getUser);
    setUser(userA);
    setChecking(false)
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthGlobal.Provider
      value={{
        user,
        setUser,
        checking
      }}>
      {props.children}
    </AuthGlobal.Provider>
  );
};

export default Auth;
