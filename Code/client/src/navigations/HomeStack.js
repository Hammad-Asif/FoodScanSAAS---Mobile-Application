import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import BarCodeScanner from '../screens/barCodeReader';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
    </Stack.Navigator>
  );
};

export default HomeStack;
