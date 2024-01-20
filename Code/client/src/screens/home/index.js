//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Heading from '../../components/Heading';
import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AuthGlobal from '../../context/AuthGlobal';
import Subscription from '../subscription';
import axios from 'axios';
import {BASE_URL} from '../../helpers/constants';
import SimpleButton from '../../components/SimpleButton';

const {height, width} = Dimensions.get('window');

// create a component
const Home = () => {
  const {user} = useContext(AuthGlobal);
  const navigation = useNavigation();

  const [productList, setProductList] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredProductList = productList?.filter(t => {
    let word = `${t?.name} ${t?.brand} ${t?.name} ${t?.brand} ${t?.ingredients}`;
    return word.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <Heading>Home</Heading>

      <SearchHeader query={searchQuery} onSearch={setSearchQuery} />

      {searchQuery?.length > 0 ? (
        <>
          {productList?.length > 0 && (
            <FlatList
              contentContainerStyle={{padding: 10}}
              data={!!searchQuery ? filteredProductList : productList}
              renderItem={({item}) => (
                <ProductCard
                  name={item?.name}
                  photo={item?.photo}
                  brand={item?.brand}
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
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: 'red'}}>Record not found</Text>
            </View>
          )}

          {isloading && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={'#f96331'} />
            </View>
          )}
          {error && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: 'red'}}>{error}</Text>
            </View>
          )}
        </>
      ) : (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: width / 2, height: width / 2}}
              onPress={() => navigation.navigate('BarCodeScanner')}>
              <Image
                source={require('../../assets/images/qr.png')}
                style={{width: '100%', height: '100%', aspectRatio: 1}}
              />
            </TouchableOpacity>
          </View>

          <SimpleButton
            label={'Scan'}
            onPress={() => navigation.navigate('BarCodeScanner')}
            style={{margin: 15}}
          />
        </>
      )}

      <Modal visible={user?.isSubscribed == false} animationType="fade">
        <Subscription />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default Home;
