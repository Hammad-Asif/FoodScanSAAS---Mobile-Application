//import liraries
import React, {Component, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import InputField from '../../../components/InputField';
import SimpleButton from '../../../components/SimpleButton';
import {useNavigation} from '@react-navigation/native';
import AuthGlobal from '../../../context/AuthGlobal';
import {BASE_URL} from '../../../helpers/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {validateEmail} from '../../../helpers/validation';

// create a component
const {width, height} = Dimensions.get('window');

const SignIn = () => {
  const {setUser} = useContext(AuthGlobal);

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (email?.trim() == '' || password?.trim() == '') {
      return showMessage({
        message: 'Please fill all fields',
        backgroundColor: 'red',
      });
    }
    if (!validateEmail(email)) {
      return showMessage({
        message: 'Please enter valid email',
        backgroundColor: 'red',
      });
    }
    try {
      setLoading(true);
      const res = await axios({
        method: 'post',
        url: `${BASE_URL}users/signin`,
        data: {
          email: email?.trim()?.toLowerCase(),
          password: password?.trim(),
        },
      });

      if (res?.data) {
        await AsyncStorage.setItem('user', JSON.stringify(res?.data?.user));
        setUser(res?.data?.user);
      }
    } catch (error) {
      return showMessage({
        message:
          error?.response?.data?.message ||
          error?.response?.data ||
          error?.message,
        backgroundColor: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{height, backgroundColor: '#fff', justifyContent: 'center'}}>
      {/* <ImageBackground
        source={require('../../../assets/images/back-image-12.jpg')}
        style={styles.container}> */}
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 5,
          }}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={{
              width: 80,
              height: 80,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />

          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              color: '#444',
            }}>
            Log In
          </Text>

          <InputField
            value={email}
            onChangeText={setEmail}
            label={'Email'}
            placeHolder={'Enter your email'}
          />
          <InputField
            value={password}
            onChangeText={setPassword}
            label={'Password'}
            placeHolder={'Enter your password'}
            isPassword={true}
            style={{marginTop: 15}}
          />

          <SimpleButton
            loading={loading}
            onPress={handleSignIn}
            label={'Sign In'}
            style={{marginTop: 15}}
          />

          <View style={styles.bottomText}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{fontWeight: 'bold', color: '#f96331'}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      {/* </ImageBackground> */}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  bottomText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    alignSelf: 'center',
    marginTop: 5,
  },
});

//make this component available to the app
export default SignIn;
