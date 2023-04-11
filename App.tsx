/* eslint-disable global-require */
import { loadAsync } from 'expo-font';
import {
  lockAsync,
  OrientationLock,
  addOrientationChangeListener,
  removeOrientationChangeListener,
} from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StorybookUIRoot from './storybook';
import { checkUpdate } from '@/apis/notification';
import { Routes } from '@/feature/Routes';
import useIntervalAsync from '@/hooks/useIntervalAsync';
import useSplash from '@/hooks/useSplash';
import { useDeviceStore } from '@/states/deviceStore';
import { useGlobalStore } from '@/states/globalStore';

const isStorybookEnabled = process.env.STORYBOOK_ENABLED === 'true';

const white = '#fff';

const SPLASH_TIME = 1000;

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
  const { setOrientation } = useDeviceStore();
  useEffect(() => {
    const initialFetch = async () => {
      const start = new Date().getTime();
      await loadFonts();
      await lockAsync(OrientationLock.DEFAULT);
      try {
        const updateCheckResult = await Updates.checkForUpdateAsync();
        if (updateCheckResult.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
          return;
        }
      } catch (error) {
        console.error(error);
      }
      const end = new Date().getTime();

      if (end - start < SPLASH_TIME) {
        setTimeout(() => {
          setIsReady(true);
        }, SPLASH_TIME - end + start);
      } else {
        setIsReady(true);
      }
    };
    initialFetch();
    const subscription = addOrientationChangeListener((e) => {
      setOrientation(e.orientationInfo.orientation);
    });

    return () => {
      removeOrientationChangeListener(subscription);
    };
  }, [setIsReady, setOrientation]);

  const { setIsUpdated } = useGlobalStore();

  const fetchIsUpdated = useCallback(async () => {
    const response = await checkUpdate();
    if (response.isSuccess) {
      const { result } = response.result;
      setIsUpdated(result.isUpdated);
    } else {
      setIsUpdated(false);
    }
  }, [setIsUpdated]);

  useIntervalAsync(fetchIsUpdated, 60 * 1000);

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
