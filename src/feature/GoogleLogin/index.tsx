/* eslint-disable no-console */
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import { Button } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import '@/services/firebase';

GoogleSignin.configure();

WebBrowser.maybeCompleteAuthSession();

const styles = StyleSheet.create({
  text: {
    color: COLOR.mono.black,
  },
});

const GoogleLogin = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Button
      icon={<GoogleIcon />}
      // disabled={!request}
      onPress={signIn}
      backgroundColor="#ffffff"
    >
      <Text style={[TEXT_STYLE.button16M, styles.text]}>Google로 시작하기</Text>
    </Button>
  );
};

export default GoogleLogin;
