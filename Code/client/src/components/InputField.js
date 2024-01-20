//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// create a component
const InputField = ({
  placeHolder,
  label,
  onChangeText,
  value,
  isPassword,
  style,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={style}>
      <Text style={{fontWeight: 'bold', color: '#444', marginBottom: 5}}>
        {label}
      </Text>

      <View style={styles.inputBox}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword && isPassword}
          placeholder={placeHolder}
          placeholderTextColor={'gray'}
          style={{fontSize: 15, padding: 0, flex: 1, color: '#000'}}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(pre => !pre)}>
            <Image
              source={
                showPassword
                  ? require('../assets/images/eye-on.png')
                  : require('../assets/images/eye-off.png')
              }
              style={{width: 20, height: 20, tintColor: '#444'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  inputBox: {
    flexDirection: 'row',
    // backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: 'gray',
    height: 48,
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
  },
});

//make this component available to the app
export default InputField;
