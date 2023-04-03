import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyScreen from '../screens/VerifyScreen';
import theme from '../theme';

const Stack = createStackNavigator();

const UnAuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.text,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.text,
        }}
      />
      <Stack.Screen
        name="Verify"
        component={VerifyScreen}
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.text,
        }}
      />
    </Stack.Navigator>
  )
}

export default UnAuthenticatedStack;