import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AppHeader from '../components/AppHeader';


const Stack = createStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <AppHeader />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;