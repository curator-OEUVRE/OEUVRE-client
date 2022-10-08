/* eslint-disable react-native/no-raw-text */
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import Logo from '@/assets/icons/Logo';
import { COLOR } from '@/constants/styles/colors';
import { TEXT_STYLE } from '@/constants/styles/textStyles';
import AppleLogin from '@/feature/AppleLogin';
import GoogleLogin from '@/feature/GoogleLogin';
import KakaoLogin from '@/feature/KakaoLogin';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  text: {
    color: COLOR.mono.white,
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'center',
  },
  wrapButtons: {
    alignItems: 'center',
    bottom: '5%',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  wrapLogo: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: '36%',
  },
});

const LoginScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('@/assets/images/login.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.wrapLogo}>
        <Logo />
        <Text style={[styles.text, TEXT_STYLE.body16B]}>
          당신의 작품을{'\n'}전시하세요
        </Text>
      </View>
      <View style={styles.wrapButtons}>
        {Platform.OS === 'ios' && <AppleLogin />}
        <GoogleLogin />
        <KakaoLogin />
      </View>
    </ImageBackground>
  </View>
);

export default LoginScreen;
