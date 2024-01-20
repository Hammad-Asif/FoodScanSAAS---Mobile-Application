//import liraries
import React, {Component, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

// create a component
const ProductCard = ({name, brand, photo, ingredients, rating, chatGptDes}) => {
  const [showModal, setShowModal] = useState(false);

  let color = useMemo(() => {
    if (rating >= 8 && rating <= 10) {
      return 'green';
    } else if (rating >= 4 && rating <= 7) {
      return 'yellow';
    } else {
      return 'red';
    }
  }, [rating]);

  return (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.container}>
      <Image
        source={{
          uri: photo,
        }}
        style={{
          height: 55,
          width: 55,
          borderRadius: 5,
        }}
      />

      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subTitle}>{brand}</Text>
        <Text numberOfLines={1} style={{color: '#444'}}>
          {ingredients}
        </Text>
      </View>

      <View style={[styles.ratingBox, {backgroundColor: color}]} />

      <Modal visible={showModal}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeBtn}>
            <Text style={{fontSize: 20, marginBottom: 5, color: '#fff'}}>
              ✖
            </Text>
          </TouchableOpacity>
          <Image
            source={{uri: photo}}
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
            <View style={[styles.ratingBox, {backgroundColor: color}]} />

            <View>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.text}>{name}</Text>
            </View>

            <View>
              <Text style={styles.title}>Brand Name</Text>
              <Text style={styles.text}>{brand}</Text>
            </View>

            <View>
              {Object.entries(JSON.parse(chatGptDes)).map(
                ([ingredient, info]) => (
                  <View key={ingredient} style={{marginBottom: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        color: '#000',
                      }}>
                      {ingredient}
                    </Text>

                    <Text style={{fontSize: 14, color: '#444'}}>
                      {info?.definition}
                    </Text>
                    {/* <Text style={{fontSize: 14, marginTop: 5, color: '#444'}}>
                      Effect on Health: {info?.effect}
                    </Text> */}
                  </View>
                ),
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {fontSize: 16, color: '#444', fontWeight: '700'},
  subTitle: {color: 'gray', fontSize: 12},
  ratingBox: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 16, color: '#444', textTransform: 'capitalize'},
  closeBtn: {
    height: 35,
    width: 35,
    zIndex: 11,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

//make this component available to the app
export default ProductCard;
