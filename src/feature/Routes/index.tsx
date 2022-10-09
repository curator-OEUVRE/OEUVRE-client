import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthStack, { AuthStackParamsList } from './AuthStack';
import { Navigator } from '@/constants/screens';

export type RootStackParamsList = {
  [Navigator.AuthStack]: AuthStackParamsList;
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
    </Stack.Navigator>
  </NavigationContainer>
);
