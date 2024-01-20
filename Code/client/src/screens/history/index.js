//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Heading from '../../components/Heading';
import ProductCard from '../../components/ProductCard';
import AuthGlobal from '../../context/AuthGlobal';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../helpers/constants';

// create a component
const History = () => {
  const {user} = useContext(AuthGlobal);

  const [productList, setProductList] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  const getProductList = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${BASE_URL}products/user/${user?._id}`,
      });

      if (res?.data) {
        setProductList(res?.data);
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
    isFocused && getProductList();

    return () => {
      setProductList(null);
      setError(null);
      setIsLoading(true);
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>

<Heading>History</Heading>

      {productList?.length > 0 && (
        <FlatList
          contentContainerStyle={{padding: 10}}
          data={productList}
          renderItem={({item}) => (
            <ProductCard
              name={item?.name}
              brand={item?.brand}
              photo={item?.photo}
              ingredients={item?.ingredients}
              rating={item?.rating}
              chatGptDes={item?.chatGptDes}
            />
          )}
          ItemSeparatorComponent={
            <View style={{backgroundColor: '#e5e5e5', height: 1}} />
          }
        />
      )}

      {productList?.length == 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: 'red'}}>Record not found</Text>
        </View>
      )}

      {isloading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'#f96331'} />
        </View>
      )}
      {error && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: 'red'}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default History;
