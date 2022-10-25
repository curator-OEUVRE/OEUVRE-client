import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { COLOR } from '@/constants/styles/colors';

interface HeaderProps {
  headerTitle?: string | (() => React.ReactNode);
  headerRight?: () => React.ReactNode;
  backgroundColor?: string;
  iconColor?: string;
  onBackPress?: () => void;
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
    position: 'relative',
    width: '100%',
    zIndex: 100,
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
  },
});

const Header = ({
  headerTitle,
  headerRight,
  backgroundColor = COLOR.mono.white,
  iconColor = COLOR.mono.black,
  onBackPress,
}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Pressable
        style={styles.arrowLeft}
        onPress={onBackPress ?? (() => navigation.goBack())}
      >
        <ArrowBackIcon color={iconColor} />
      </Pressable>
      {typeof headerTitle === 'string' ? (
        <Text style={styles.text}>{headerTitle}</Text>
      ) : (
        headerTitle && headerTitle()
      )}
      <View style={styles.right}>{headerRight && headerRight()}</View>
    </View>
  );
};

export { Header };
