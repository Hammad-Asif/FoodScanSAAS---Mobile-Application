import {NavigationContainer} from '@react-navigation/native';

import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import {useContext} from 'react';
import AuthGlobal from '../context/AuthGlobal';
import { ActivityIndicator, View } from 'react-native';

const RootStack = () => {
  const {user, checking} = useContext(AuthGlobal);

  if(checking){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'#f96331'}/>
      </View>
    )
  }

  return (
    <NavigationContainer>
      {!!user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
