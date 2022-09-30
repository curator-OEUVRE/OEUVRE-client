import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';

SplashScreen.preventAutoHideAsync();

const useSplash = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const onLayout = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  return { isReady, setIsReady, onLayout };
};

export default useSplash;
