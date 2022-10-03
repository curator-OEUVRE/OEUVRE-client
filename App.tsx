/* eslint-disable global-require */
import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StorybookUIRoot from './storybook';
import useSplash from '@/hooks/useSplash';

const isStorybookEnabled = Boolean(process.env.STORYBOOK_ENABLED);

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

const SampleApp = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
  </View>
);

const EntryApp = isStorybookEnabled ? StorybookUIRoot : SampleApp;

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
    <SafeAreaProvider>
      <View style={styles.container} onLayout={onLayout}>
        <EntryApp />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
