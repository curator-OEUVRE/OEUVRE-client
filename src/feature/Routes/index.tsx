import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthStack, { AuthStackParamsList } from './AuthStack';
import MainTabNavigator, { MainTabParamsList } from './MainTabNavigator';
import { Navigator, Screen } from '@/constants/screens';
import WelcomeScreen, { WelcomeScreenParams } from '@/screens/WelcomeScreen';
import { useAuthStore } from '@/states/authStore';

export type RootStackParamsList = {
  [Navigator.AuthStack]: NavigatorScreenParams<AuthStackParamsList>;
  [Screen.WelcomeScreen]: WelcomeScreenParams;
  [Navigator.MainTab]: NavigatorScreenParams<MainTabParamsList>;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const Routes = () => {
  const { accessToken } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {accessToken ? (
          <Stack.Screen name={Navigator.MainTab} component={MainTabNavigator} />
        ) : (
          <Stack.Screen name={Navigator.AuthStack} component={AuthStack} />
        )}
        <Stack.Screen name={Screen.WelcomeScreen} component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
