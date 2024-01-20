import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/auth/signUp';
import SignIn from '../screens/auth/signIn';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
