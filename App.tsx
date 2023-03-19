/* eslint-disable global-require */
import { loadAsync } from 'expo-font';
import {
  lockAsync,
  OrientationLock,
  getOrientationLockAsync,
} from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StorybookUIRoot from './storybook';
import { checkUpdate } from '@/apis/notification';
import RotateIcon from '@/assets/icons/Rotate';
import { COLOR } from '@/constants/styles';
import { Routes } from '@/feature/Routes';
import useIntervalAsync from '@/hooks/useIntervalAsync';
import useSplash from '@/hooks/useSplash';
import { useGlobalStore } from '@/states/globalStore';

const isStorybookEnabled = process.env.STORYBOOK_ENABLED === 'true';

const white = '#fff';

const SPLASH_TIME = 1000;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
  },
  rotate: {
    alignItems: 'center',
    backgroundColor: COLOR.mono.white,
    borderRadius: 35,
    bottom: 100,
    height: 70,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    width: 70,
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
  }, [setIsReady]);

  const { setIsUpdated } = useGlobalStore();

  const rotateDevice = useCallback(async () => {
    const orientation = await getOrientationLockAsync();
    if (orientation === OrientationLock.LANDSCAPE_RIGHT) {
      await lockAsync(OrientationLock.PORTRAIT_UP);
    } else {
      await lockAsync(OrientationLock.LANDSCAPE_RIGHT);
    }
  }, []);

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
        <Pressable style={styles.rotate} onPress={rotateDevice}>
          <RotateIcon />
        </Pressable>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
