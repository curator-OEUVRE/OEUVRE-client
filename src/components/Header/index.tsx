import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { COLOR } from '@/constants/styles/colors';

interface HeaderProps {
  headerTitle?: string | (() => React.ReactNode);
  headerRight?: () => React.ReactNode;
}

const styles = StyleSheet.create({
  arrowLeft: {
    alignItems: 'center',
    height: 26,
    justifyContent: 'center',
    left: 13,
    position: 'absolute',
    top: 10,
    width: 26,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    paddingLeft: 13,
    paddingRight: 18,
    position: 'relative',
    width: '100%',
  },
  right: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 18,
  },
  text: {
    fontFamily: 'bold',
    fontSize: 18,
    lineHeight: 27,
  },
});

const Header = ({ headerTitle, headerRight }: HeaderProps) => (
  <View style={styles.container}>
    <Pressable style={styles.arrowLeft}>
      <ArrowBackIcon color={COLOR.mono.black} />
    </Pressable>
    {typeof headerTitle === 'string' ? (
      <Text style={styles.text}>{headerTitle}</Text>
    ) : (
      headerTitle && headerTitle()
    )}
    <View style={styles.right}>{headerRight && headerRight()}</View>
  </View>
);

export { Header };
