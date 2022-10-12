import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthStack, { AuthStackParamsList } from './AuthStack';
import { Navigator, Screen } from '@/constants/screens';
import WelcomeScreen, { WelcomeScreenParams } from '@/screens/WelcomeScreen';

export type RootStackParamsList = {
  [Navigator.AuthStack]: AuthStackParamsList;
  [Screen.WelcomeScreen]: WelcomeScreenParams;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Navigator.AuthStack} component={AuthStack} />
      <Stack.Screen name={Screen.WelcomeScreen} component={WelcomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
