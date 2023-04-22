import {
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import AuthStack, { AuthStackParamsList } from './AuthStack';
import CreateFloorStack, {
  CreateFloorStackParamsList,
} from './CreateFloorStack';
import FloorStack, { FloorStackParamsList } from './FloorStack';
import MainTabNavigator, { MainTabParamsList } from './MainTabNavigator';
import { getMyProfile, updatePushToken } from '@/apis/user';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles';
import useAuth from '@/hooks/useAuth';
import WelcomeScreen, { WelcomeScreenParams } from '@/screens/WelcomeScreen';
import { useUserStore } from '@/states/userStore';

export type RootStackParamsList = {
  [Navigator.AuthStack]: NavigatorScreenParams<AuthStackParamsList>;
  [Navigator.FloorStack]: NavigatorScreenParams<FloorStackParamsList>;
  [Screen.WelcomeScreen]: WelcomeScreenParams;
  [Navigator.MainTab]: NavigatorScreenParams<MainTabParamsList>;
  [Navigator.CreateFloorStack]: NavigatorScreenParams<CreateFloorStackParamsList>;
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

    async function refreshPushToken() {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          await Notifications.requestPermissionsAsync();
        }

        const token = await Notifications.getExpoPushTokenAsync();
        await fetchWithToken(updatePushToken, {
          token: token.data,
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (accessToken) {
      refreshProfile();
      refreshPushToken();
    }
  }, [fetchWithToken, setUser, accessToken]);

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
        <Stack.Screen
          name={Navigator.CreateFloorStack}
          component={CreateFloorStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
