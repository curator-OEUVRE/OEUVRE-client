/* eslint-disable no-console */
import '@/services/firebase';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GOOGLE_WEB_CLIENT_ID } from 'react-native-dotenv';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import { Button } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';

GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });

const styles = StyleSheet.create({
  text: {
    color: COLOR.mono.black,
  },
});

interface Props {
  onSuccess?: (token: string) => void;
}

const GoogleLogin = ({ onSuccess }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(user);
      if (userInfo.idToken) onSuccess?.(userInfo.idToken);
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
