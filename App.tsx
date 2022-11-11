/* eslint-disable global-require */
import { loadAsync } from 'expo-font';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StorybookUIRoot from './storybook';
import { Routes } from '@/feature/Routes';
import useSplash from '@/hooks/useSplash';

const isStorybookEnabled = process.env.STORYBOOK_ENABLED === 'true';

const white = '#fff';

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
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
  const EntryApp = isStorybookEnabled ? StorybookUIRoot : Routes;
  const { isReady, setIsReady, onLayout } = useSplash();
  useEffect(() => {
    const initialFetch = async () => {
      const start = new Date().getTime();
      await loadFonts();
      await lockAsync(OrientationLock.PORTRAIT_UP);
      const end = new Date().getTime();

      if (end - start < 2000) {
        setTimeout(() => {
          setIsReady(true);
        }, 2000 - end + start);
      } else {
        setIsReady(true);
      }
    };
    initialFetch();
  }, [setIsReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container} onLayout={onLayout}>
        <EntryApp />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
