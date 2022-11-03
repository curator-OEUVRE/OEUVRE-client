import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ArrowBackIcon from '@/assets/icons/ArrowBack';
import { COLOR } from '@/constants/styles/colors';

interface HeaderProps {
  headerLeft?: () => React.ReactNode;
  headerTitle?: string | (() => React.ReactNode);
  headerRight?: ({ iconColor }: { iconColor?: string }) => React.ReactNode;
  backgroundColor?: string;
  iconColor?: string;
  onGoBack?: () => void;
  titleColor?: string;
  hideBackButton?: boolean;
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
    zIndex: 10,
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
    zIndex: 10,
  },
  text: {
    fontFamily: 'bold',
    fontSize: 18,
  },
});

const Header = ({
  headerLeft,
  headerTitle,
  headerRight,
  onGoBack,
  backgroundColor = COLOR.mono.white,
  iconColor = COLOR.mono.black,
  titleColor = COLOR.mono.black,
  hideBackButton = false,
}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {headerLeft ? (
        headerLeft()
      ) : (
        <Pressable
          style={styles.arrowLeft}
          onPress={() => {
            onGoBack?.();
            navigation.goBack();
          }}
        >
          <ArrowBackIcon color={iconColor} />
        </Pressable>
      )}
      {typeof headerTitle === 'string' ? (
        <Text style={[styles.text, { color: iconColor }]}>{headerTitle}</Text>
      ) : (
        headerTitle && headerTitle({ iconColor })
      )}
      <View style={styles.right}>
        {headerRight && headerRight({ iconColor })}
      </View>
    </View>
  );
};

export { Header };
