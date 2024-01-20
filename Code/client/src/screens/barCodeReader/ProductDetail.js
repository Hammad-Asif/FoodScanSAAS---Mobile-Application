//import liraries
import React, {Component, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import Heading from '../../components/Heading';
import SimpleButton from '../../components/SimpleButton';
import axios from 'axios';
import {BASE_URL} from '../../helpers/constants';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AuthGlobal from '../../context/AuthGlobal';

// create a component
const ProductDetail = ({onClosePress, loading, error, product}) => {
  const {user} = useContext(AuthGlobal);

  const [loadingRequest, setLoadingRequest] = useState(false);

  const saveProducts = async () => {
    setLoadingRequest(true);
    try {
      const res = await axios({
        method: 'post',
        url: `${BASE_URL}products`,
        data: {
          ...product,
          user: user?._id,
          name: product?.food_name,
          brand: product?.brand_name,
          ingredients: product?.nf_ingredient_statement?.toLowerCase(),
          photo: product?.photo?.thumb,
          chatGptDes: product?.chatGptDes,
        },
      });

      if (res?.data) {
        Alert.alert('Saved!', 'Product saved successfully');
        return showMessage({
          message: 'Product Saved!',
          backgroundColor: '#9e63d7',
        });
      }
    } catch (error) {
      return Alert.alert(
        'Error!',
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message,
      );
    } finally {
      setLoadingRequest(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Heading>Product Scanned</Heading>

        <TouchableOpacity onPress={onClosePress} style={{padding: 15}}>
          <Image
            source={require('../../assets/images/close.png')}
            style={{height: 20, width: 20, tintColor: 'red'}}
          />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.boxContainer}>
          <ActivityIndicator size={'large'} color={'#f96331'} />
        </View>
      )}
      {error && (
        <View style={styles.boxContainer}>
          <Text style={{color: 'red', fontSize: 18}}>{error}</Text>
        </View>
      )}

      {product && (
        <ScrollView>
          <Image
            source={{uri: product?.photo?.thumb}}
            style={{
              height: 200,
              width: '100%',
              resizeMode: 'contain',
              margin: 10,
            }}
          />
          <View
            style={{
              padding: 10,
              backgroundColor: '#f5f5f5',
              margin: 10,
              borderRadius: 12,
              flexWrap: 'nowrap',
              gap: 10,
            }}>
            <View>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.text}>{product?.food_name}</Text>
            </View>

            <View>
              <Text style={styles.title}>Brand Name</Text>
              <Text style={styles.text}>{product?.brand_name}</Text>
            </View>

            {Object.entries(JSON.parse(product?.chatGptDes)).map(([ingredient, info]) => (
              <View key={ingredient} style={{marginBottom: 10}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize', color: '#000'}}>
                  {ingredient}
                </Text>

                <Text style={{fontSize: 14, color: '#444'}}>{info?.definition}</Text>
                {/* <Text style={{fontSize: 14, marginTop: 5, color: '#444'}}>Effect on Health: {info?.effect}</Text> */}
              </View>
            ))}

            <SimpleButton
              loading={loadingRequest}
              onPress={saveProducts}
              label={'Save'}
              style={{marginTop: 15}}
            />
          </View>
        </ScrollView>
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
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 13, fontWeight: 'bold', color: '#f96331'},
  text: {fontSize: 16, color: '#444', textTransform: 'capitalize'},
});

//make this component available to the app
export default ProductDetail;
