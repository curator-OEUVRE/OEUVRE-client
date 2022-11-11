/* eslint-disable react-native/no-raw-text */
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Navigator, Screen } from '@/constants/screens';
import { COLOR } from '@/constants/styles/colors';
import { TEXT_STYLE } from '@/constants/styles/textStyles';
import { RootStackParamsList } from '@/feature/Routes';
import { useSignUpStore } from '@/states/signUpStore';

export type WelcomeScreenParams = {
  name: string;
};
export type WelcomeScreenNP = StackNavigationProp<
  RootStackParamsList,
  Screen.WelcomeScreen
>;
export type WelcomeScreenRP = RouteProp<
  RootStackParamsList,
  Screen.WelcomeScreen
>;

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
    top: '24%',
  },
});

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNP>();
  const { name, clearSignUpStore } = useSignUpStore();
  const [displayName, setDisplayName] = useState(name.value);

  useEffect(() => {
    if (name.value.length > 0) setDisplayName(name.value);
  }, [name.value]);

  return (
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('@/assets/images/welcome.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Header iconColor={COLOR.mono.white} backgroundColor="transparent" />
        <Text style={[styles.message, TEXT_STYLE.title24M]}>
          <Text style={TEXT_STYLE.title24B}>{`${displayName} `}</Text>
          님,{'\n'}OEUVRE에{'\n'}오신 것을 환영해요!
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={() => {
              clearSignUpStore();
              navigation.navigate(Navigator.MainTab, {
                screen: Navigator.HomeStack,
                params: {
                  screen: Screen.HomeScreen,
                },
              });
            }}
          >
            <Text style={[styles.buttonText, TEXT_STYLE.button16M]}>
              시작하기
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomeScreen;
