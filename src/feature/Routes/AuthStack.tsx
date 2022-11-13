import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Screen } from '@/constants/screens';
import LoginScreen, { LoginScreenParams } from '@/screens/LoginScreen';
import OnboardingScreen, {
  type OnboardingScreenParams,
} from '@/screens/OnboardingScreen';
import {
  PersonalDataFormScreen,
  PersonalDataFormScreenParams,
  TermsFormScreen,
  TermsFormScreenParams,
  UserProfileFormScreen,
  UserProfileFormScreenParams,
} from '@/screens/SignUpScreen';

export type AuthStackParamsList = {
  [Screen.OnboardingScreen]: OnboardingScreenParams;
  [Screen.LoginScreen]: LoginScreenParams;
  [Screen.TermsFormScreen]: TermsFormScreenParams;
  [Screen.PersonalDataFormScreen]: PersonalDataFormScreenParams;
  [Screen.UserProfileFormScreen]: UserProfileFormScreenParams;
};

const Stack = createStackNavigator<AuthStackParamsList>();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName={Screen.OnboardingScreen}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={Screen.OnboardingScreen} component={OnboardingScreen} />
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
  </Stack.Navigator>
);

export default AuthStack;
