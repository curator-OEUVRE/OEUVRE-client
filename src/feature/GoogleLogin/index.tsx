import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import '@/services/firebase';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GOOGLE_CLIENT_ID } from 'react-native-dotenv';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import { Button } from '@/components';
import { COLOR } from '@/constants/styles';

WebBrowser.maybeCompleteAuthSession();

const styles = StyleSheet.create({
  text: {
    color: COLOR.mono.black,
  },
});

const GoogleLogin = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      // eslint-disable-next-line camelcase
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <Button
      icon={<GoogleIcon />}
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
