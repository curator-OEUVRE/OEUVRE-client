/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Button } from '@/components/Button';
import { COLOR } from '@/constants/styles/colors';
import { TEXT_STYLE } from '@/constants/styles/textStyles';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  buttonText: {
    color: COLOR.mono.white,
  },
  buttonWrapper: {
    alignItems: 'center',
    bottom: 48,
    position: 'absolute',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  message: {
    color: COLOR.mono.white,
    left: 35,
    lineHeight: 36,
    position: 'absolute',
    top: 200,
  },
});

const WelcomeScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('@/assets/images/welcome.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <Text style={[styles.message, TEXT_STYLE.title24M]}>
        <Text style={TEXT_STYLE.title24B}>열심히 입력중인 모습입니다 </Text>
        님,{'\n'}OEUVRE에{'\n'}오신 것을 환영해요!
      </Text>
      <View style={styles.buttonWrapper}>
        <Button>
          <Text style={[styles.buttonText, TEXT_STYLE.button16M]}>
            시작하기
          </Text>
        </Button>
      </View>
    </ImageBackground>
  </View>
);

export default WelcomeScreen;
