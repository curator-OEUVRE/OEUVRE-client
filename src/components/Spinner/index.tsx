/* eslint-disable global-require */

import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  lottie: {
    width: 200,
  },
});

const Spinner = () => (
  <View style={styles.container}>
    <LottieView
      style={styles.lottie}
      autoPlay
      source={require('@/assets/lottie/loading.json')}
    />
  </View>
);

export { Spinner };
