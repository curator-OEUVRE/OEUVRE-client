/* eslint-disable global-require */
import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StorybookUIRoot from './storybook';
import useSplash from '@/hooks/useSplash';

const isStorybookEnabled = Boolean(process.env.STORYBOOK_ENABLED);

const white = '#fff';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center',
  },
});

const loadFonts = async () => {
  await loadAsync({
    bold: require('./assets/fonts/Pretendard-Bold.otf'),
    medium: require('./assets/fonts/Pretendard-Medium.otf'),
    regular: require('./assets/fonts/Pretendard-Regular.otf'),
  });
};

const App = () => {
  const { isReady, setIsReady, onLayout } = useSplash();
  useEffect(() => {
    const initialFetch = async () => {
      await loadFonts();
      setIsReady(true);
    };
    initialFetch();
  }, [setIsReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default isStorybookEnabled ? StorybookUIRoot : App;
