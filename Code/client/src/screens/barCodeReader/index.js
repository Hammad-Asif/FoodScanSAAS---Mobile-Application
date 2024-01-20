import React, {Component, useState} from 'react';
import {View, StyleSheet, Alert, Modal} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import ProductDetail from './ProductDetail';

// create a component
const BarCodeScanner = () => {
  const [doScanBarcode, setDoScanBarcode] = useState(true);

  const [openProductModal, setOpenProductModal] = useState(false);

  const [loadFinding, setLoadFinding] = useState(false);
  const [errorFinding, setErrorFinding] = useState(null);
  const [product, setProduct] = useState(null);

  const handleScanCode = async event => {
    if (event?.nativeEvent?.codeStringValue) {
      setDoScanBarcode(false);
      setOpenProductModal(true);
      await findProduct(event?.nativeEvent?.codeStringValue);
    }
    return;
  };

  const findProduct = async productId => {
    setErrorFinding(null);
    setProduct(null);
    setLoadFinding(true);
    try {
      const resScanned = await axios({
        method: 'get',
        url: `https://trackapi.nutritionix.com/v2/search/item?upc=${productId}`,
        headers: {
          'x-app-id': 'ea2cca08',
          'x-app-key': '86be5745f1756526cf9223d3e33d1a1f',
        },
      });

      if (resScanned?.data?.foods[0]) {
        const resChat = await axios({
          method: 'post',
          url: `https://api.openai.com/v1/chat/completions`,
          data: {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `give me response according to instructions. instructions: here is the list of ingredient found in a food, list is separted by comma ${resScanned?.data?.foods[0]?.nf_ingredient_statement}, I need to know for each ingredient if it is good or bad for heath. Response 'Good' if it is good for health in more foods and 'Bad' if it is unhealthy in more foods and 'Unknonw' if it is not healthy nor unhealthy. Don't add anything accept these reponse words. I need two things in reponse with heading as 'definition' in which I need the definition of ingredient and other is 'effect' in which I need Good or Bad or Unknown. Provide me in json format. the  schema for json is ' a dictionary of dictionaries in which the parent dictionary will have a key as ingredient name and value will be sub dictionary. A sub- dictionary will contain the definition and effect as key`,
              },
            ],
          },
          headers: {
            Authorization:
              'Bearer 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',
          },
        });

        if (resChat?.data) {
          setProduct({
            ...resScanned?.data?.foods[0],
            chatGptDes: resChat?.data?.choices[0]?.message?.content,
          });
        }
      }
    } catch (error) {
      setErrorFinding(
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message,
      );
    } finally {
      setLoadFinding(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <CameraScreen
        scanBarcode={doScanBarcode}
        onReadCode={handleScanCode} // optional
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
        hideControls={undefined}
        onBottomButtonPressed={() => console.log('Bottom Pressed')}
      />

      <Modal visible={openProductModal} animationType="fade">
        <ProductDetail
          loading={loadFinding}
          error={errorFinding}
          product={product}
          onClosePress={() => {
            setDoScanBarcode(true);
            setErrorFinding(null);
            setLoadFinding(false);
            setProduct(null);
            setOpenProductModal(false);
          }}
        />
      </Modal>
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
export default BarCodeScanner;
