//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import SimpleButton from '../../components/SimpleButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/AuthGlobal';
import {useIsFocused} from '@react-navigation/native';
import {BASE_URL} from '../../helpers/constants';
import Heading from '../../components/Heading';
import axios from 'axios';
import moment from 'moment';

// create a component
const Profile = () => {
  const {user, setUser} = useContext(AuthGlobal);

  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  const getSubscription = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${BASE_URL}subscriptions/user/${user?._id}`,
      });

      if (res?.data) {
        setSubscription(res?.data[0]);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isFocused && getSubscription();

    return () => {
      setSubscription(null);
      setError(null);
      setIsLoading(true);
    };
  }, [isFocused]);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Heading>Profile</Heading>

      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{width: '50%', fontSize: 15, color: '#444'}}>Name</Text>
          <Text style={{width: '50%', fontSize: 15, color: '#444'}}>
            {user?.name}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{width: '50%', fontSize: 15, color: '#444'}}>Email</Text>
          <Text style={{width: '50%', fontSize: 15, color: '#444'}}>
            {user?.email}
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 18,
          color: '#f96331',
          fontWeight: 'bold',
          margin: 10,
        }}>
        Subscription
      </Text>

      <View
        style={{
          backgroundColor: '#fff',
          margin: 10,
          padding: 10,
          borderRadius: 10,
          marginTop: 0,
        }}>
        {subscription && (
          <>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#444'}}>
              {subscription?.plan?.title} ${subscription?.plan?.price}
            </Text>

            <View style={{marginTop: 10}}>
              <Text style={{fontWeight: 'bold', color: '#444'}}>Starts At</Text>
              <Text>
                {moment(subscription?.startsAt).format('MMM DD, YYYY')}
              </Text>

              <Text style={{fontWeight: 'bold', color: '#444', marginTop: 5}}>
                Ends At
              </Text>
              <Text>{moment(subscription?.endsAt).format('MMM DD, YYYY')}</Text>
            </View>
          </>
        )}
        {isloading && (
          <View
            style={{
              height: 100,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'#f96331'} />
          </View>
        )}
        {error && (
          <View
            style={{
              height: 100,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'red'}}>{error}</Text>
          </View>
        )}
      </View>

      {/* {subscription && (
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: 10,
          }}>
          {subscription?.plan?.title == 'Monthly' && (
            <TouchableOpacity
              style={{
                backgroundColor: '#9e4bff',
                paddingVertical: 10,
                borderRadius: 10,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: '#fff'}}>Upgrade Plan</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#9e4bff',
              paddingVertical: 10,
              borderRadius: 10,
              paddingHorizontal: 15,
            }}>
            <Text style={{color: '#9e4bff'}}>Cancel Subscription</Text>
          </TouchableOpacity>
        </View>
      )} */}

      <SimpleButton onPress={handleLogout} label={'Logout'} style={{margin: 10}}></SimpleButton>
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
export default Profile;
