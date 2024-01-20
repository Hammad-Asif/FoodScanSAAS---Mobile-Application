//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Heading from '../../components/Heading';
import axios from 'axios';
import {BASE_URL} from '../../helpers/constants';
import SimpleButton from '../../components/SimpleButton';
import AuthGlobal from '../../context/AuthGlobal';
import paypalApi from '../../services/paypalApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import queryString from 'query-string';

// create a component
const Subscription = () => {
  const {user, setUser} = useContext(AuthGlobal);

  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null)

  const getPlans = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        url: `${BASE_URL}plans`,
        method: 'get',
      });

      if (res?.data) {
        setData(res?.data);
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
    getPlans();

    return () => {
      setData(null);
      setError(null);
      setIsLoading(true);
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [btnClicked, setBtnClicked] = useState(null);

  const onPressPaypal = async (plan, amount) => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(token, plan, amount);
      setAccessToken(token);
      console.log('res++++++', res);
      setLoading(false);
      if (!!res?.links) {
        const findUrl = res.links.find(data => data?.rel == 'approve');
        setPaypalUrl(findUrl?.href);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const onUrlChange = webviewState => {
    console.log('webviewStatewebviewState', webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log('my urls value', urlValues);
      const {token} = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }
  };

  const paymentSucess = async id => {
    try {
      const res = await paypalApi.capturePayment(id, accessToken);

      let res1 = JSON.parse(res);
      if (res1?.status == 'COMPLETED') {
        await paymentSave(res1);
      }
      Alert.alert('Payment Successful', 'You have successfully subscribed');
      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
    setBtnClicked(null);
  };

  const paymentSave = async data1 => {
    const {purchase_units} = data1;
    const {payments} = purchase_units[0];
    const payData = payments?.captures[0];

    let data = {
      user: user?._id,
      plan: selectedPlan?._id,
      paymentId: payData?.id,
      status: payData?.status,
      email: data1?.payment_source?.paypal?.email_address,
      amountFor: btnClicked,
      accountId: data1?.payment_source?.paypal?.account_id,
      name: `${data1?.payment_source?.paypal?.name?.given_name} ${data1?.payment_source?.paypal?.name?.surname}`,
      currencyCode: payData?.amount?.currency_code,
      amount: payData?.amount?.value,
      grossAmount: payData?.seller_receivable_breakdown?.gross_amount?.value,
      paypalFee: payData?.seller_receivable_breakdown?.paypal_fee?.value,
      netAmount: payData?.seller_receivable_breakdown?.net_amount?.value,
    };

console.log('--- ', data);

    try {
      const res = await axios({
        method: 'post',
        url: `${BASE_URL}subscriptions`,
        data,
      });

      if (res?.data) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({...user, isSubscribed: true}),
        );
        setUser({...user, isSubscribed: true});
        setSelectedPlan(null)
      }
    } catch (error) {
      console.log('error 1 ', error);
    }
  };

  return (
    <View style={styles.container}>

      {data && (
        <FlatList
          contentContainerStyle={{marginTop: 20}}
          data={data}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#f5f5f5',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={styles.title}>{item?.title}</Text>

              <Text style={{fontSize: 16, color: '#444', marginVertical: 5}}>
                • {item?.description?.split('|')[0]?.trim()}
              </Text>
              <Text style={{fontSize: 16, color: '#444', marginVertical: 5}}>
                • {item?.description?.split('|')[1]?.trim()}
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#444',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                $ {item?.price}
              </Text>

              {item?.discount !== '' && (
                <Text
                  style={{fontSize: 15, color: '#444', textAlign: 'center'}}>
                  Saving: {item?.discount} %
                </Text>
              )}

              <SimpleButton
                onPress={() => {
                  setBtnClicked(`${item?.title} Plan`);
                  setSelectedPlan(item)
                  onPressPaypal(
                    `${item?.title} Plan`,
                    parseFloat(item?.price),
                    item?.id,
                  );
                }}
                loading={loading && btnClicked == `${item?.title} Plan`}
                style={{borderRadius: 30, marginTop: 20}}
                label={'Buy Now'}
              />
            </View>
          )}
          ItemSeparatorComponent={<View style={{height: 10}} />}
        />
      )}

      {isloading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'#9e4bff'} />
        </View>
      )}
      {error && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: 'red'}}>{error}</Text>
        </View>
      )}

      <Modal visible={!!paypalUrl}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            backgroundColor: '#0098d9',
            margin: 15,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={clearPaypalState}>
          <Text style={{color: '#fff'}}>Close</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <WebView
            source={{uri: paypalUrl}}
            onNavigationStateChange={onUrlChange}
          />
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: '#9e4bff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

//make this component available to the app
export default Subscription;
