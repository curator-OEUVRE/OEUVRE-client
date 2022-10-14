import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Screen } from '@/constants/screens';
import LoginScreen, { LoginScreenParams } from '@/screens/LoginScreen';
import {
  PersonalDataFormScreen,
  PersonalDataFormScreenParams,
  TermsFormScreen,
  TermsFormScreenParams,
  UserProfileFormScreen,
  UserProfileFormScreenParams,
} from '@/screens/SignUpScreen';
import WelcomeScreen, { WelcomeScreenParams } from '@/screens/WelcomeScreen';

export type AuthStackParamsList = {
  [Screen.LoginScreen]: LoginScreenParams;
  [Screen.TermsFormScreen]: TermsFormScreenParams;
  [Screen.PersonalDataFormScreen]: PersonalDataFormScreenParams;
  [Screen.UserProfileFormScreen]: UserProfileFormScreenParams;
  [Screen.WelcomeScreen]: WelcomeScreenParams;
};

const Stack = createStackNavigator<AuthStackParamsList>();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName={Screen.LoginScreen}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
    <Stack.Screen name={Screen.TermsFormScreen} component={TermsFormScreen} />
    <Stack.Screen
      name={Screen.PersonalDataFormScreen}
      component={PersonalDataFormScreen}
    />
    <Stack.Screen
      name={Screen.UserProfileFormScreen}
      component={UserProfileFormScreen}
    />
    <Stack.Screen name={Screen.WelcomeScreen} component={WelcomeScreen} />
  </Stack.Navigator>
);

export default AuthStack;
