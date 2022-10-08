import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList, SignUpStep } from './types';
import SignUpScreen from '@/screens/SignUpScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        initialParams={{ process: SignUpStep.Terms }}
      />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
