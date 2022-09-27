/* eslint-disable global-require */
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StorybookUIRoot from './storybook';

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

const App = () => {
  const [loaded] = useFonts({
    bold: require('./assets/fonts/Pretendard-Bold.otf'),
    medium: require('./assets/fonts/Pretendard-Medium.otf'),
    regular: require('./assets/fonts/Pretendard-Regular.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default isStorybookEnabled ? StorybookUIRoot : App;
