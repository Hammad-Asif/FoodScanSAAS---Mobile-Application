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
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import InputField from '../../../components/InputField';
import SimpleButton from '../../../components/SimpleButton';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {validateEmail} from '../../../helpers/validation';
import axios from 'axios';
import {BASE_URL} from '../../../helpers/constants';
import AuthGlobal from '../../../context/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const {width, height} = Dimensions.get('window');

const SignUp = () => {
  const {setUser} = useContext(AuthGlobal);

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      email?.trim() == '' ||
      password?.trim() == '' ||
      name?.trim() == '' ||
      confirmPassword
    ) {
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
    if (password?.trim()?.length < 8) {
      return showMessage({
        message: 'Password length must b 8 or greater',
        backgroundColor: 'red',
      });
    }
    if (password?.trim() !== confirmPassword?.trim()) {
      return showMessage({
        message: 'Confirm Password must match password',
        backgroundColor: 'red',
      });
    }
    try {
      setLoading(true);
      const res = await axios({
        method: 'post',
        url: `${BASE_URL}users/signup`,
        data: {
          email: email?.trim()?.toLowerCase(),
          password: password?.trim(),
          name: name?.trim(),
        },
      });

      if (res?.data) {
        await AsyncStorage.setItem('user', JSON.stringify(res?.data));
        setUser(res?.data);
        return showMessage({
          message: 'Registered Successfully',
          backgroundColor: '#9e63d7',
        });
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
      contentContainerStyle={{height, backgroundColor: "#fff", justifyContent: 'center'}}>
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
            Register an Account
          </Text>

          <InputField
            value={name}
            onChangeText={setName}
            label={'Name'}
            placeHolder={'Enter your name'}
          />

          <InputField
            value={email}
            onChangeText={setEmail}
            label={'Email'}
            placeHolder={'Enter your email'}
            style={{marginTop: 15}}
          />
          <InputField
            value={password}
            onChangeText={setPassword}
            label={'Password'}
            placeHolder={'Enter your password'}
            isPassword={true}
            style={{marginTop: 15}}
          />

          <InputField
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            label={'Confirm Password'}
            placeHolder={'Confirm your password'}
            isPassword={true}
            style={{marginTop: 15}}
          />

          <SimpleButton
            loading={loading}
            onPress={handleSignUp}
            label={'Sign Up'}
            style={{marginTop: 15}}
          />

          <View style={styles.bottomText}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={{fontWeight: 'bold', color: '#f96331'}}>
                Sign In
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
    height,
    width,
    backgroundColor: '#fff',
    padding: 10,
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
export default SignUp;
