import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  icon: {
    height: 21,
    width: 12,
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

const Header = ({ headerTitle, headerRight }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Pressable style={styles.arrowLeft}>
        <Image
          // eslint-disable-next-line global-require
          source={require('@/assets/icons/arrow_back.png')}
          style={styles.icon}
        />
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
