import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from 'react-native-dotenv';
import { Button } from '@/components/Button';

WebBrowser.maybeCompleteAuthSession();

const styles = StyleSheet.create({
  icon: {
    height: 32,
    width: 32,
  },
  // eslint-disable-next-line react-native/no-color-literals
  text: {
    color: '#141718',
  },
});

const GoogleLogin = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // eslint-disable-next-line no-console
      console.log(authentication);
    }
  }, [response]);

  const googleIcon = (
    <Image
      // eslint-disable-next-line global-require
      source={require('@/assets/icons/google_icon.png')}
      style={styles.icon}
    />
  );
  return (
    <Button
      icon={googleIcon}
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
      backgroundColor="#ffffff"
    >
      <Text style={styles.text}>Google로 시작하기</Text>
    </Button>
  );
};

export default GoogleLogin;
