import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthStack, { AuthStackParamsList } from './AuthStack';
import FloorStack, { FloorStackParamsList } from './FloorStack';
import { Navigator } from '@/constants/screens';

export type RootStackParamsList = {
  [Navigator.AuthStack]: AuthStackParamsList;
  [Navigator.FloorStack]: FloorStackParamsList;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Navigator.FloorStack}
    >
      <Stack.Screen name={Navigator.AuthStack} component={AuthStack} />
      <Stack.Screen name={Navigator.FloorStack} component={FloorStack} />
    </Stack.Navigator>
  </NavigationContainer>
);
