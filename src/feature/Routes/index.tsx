import {
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import AuthStack, { AuthStackParamsList } from './AuthStack';
import FloorStack, { FloorStackParamsList } from './FloorStack';
import MainTabNavigator, { MainTabParamsList } from './MainTabNavigator';
import { getMyProfile } from '@/apis/user';
import { Navigator, Screen } from '@/constants/screens';
import GuestBookScreen, {
  GuestBookScreenParams,
} from '@/screens/GuestBookScreen';
import { COLOR } from '@/constants/styles';
import useAuth from '@/hooks/useAuth';
import WelcomeScreen, { WelcomeScreenParams } from '@/screens/WelcomeScreen';
import { useUserStore } from '@/states/userStore';

export type RootStackParamsList = {
  [Navigator.AuthStack]: NavigatorScreenParams<AuthStackParamsList>;
  [Navigator.FloorStack]: NavigatorScreenParams<FloorStackParamsList>;
  [Screen.WelcomeScreen]: WelcomeScreenParams;
  [Navigator.MainTab]: NavigatorScreenParams<MainTabParamsList>;
};

const Stack = createStackNavigator<RootStackParamsList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLOR.mono.white,
  },
};

export const Routes = () => {
  const { setUser } = useUserStore();
  const { fetchWithToken, accessToken } = useAuth();

  useEffect(() => {
    async function refreshProfile() {
      const response = await fetchWithToken(getMyProfile);

      if (response.isSuccess) {
        setUser(response.result.result);
      } else {
        console.error(response.result);
      }
    }
    refreshProfile();
  }, [fetchWithToken, setUser]);

  return (
    <NavigationContainer theme={theme}>
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
        <Stack.Screen name={Navigator.FloorStack} component={FloorStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
