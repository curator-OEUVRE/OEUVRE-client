import { View, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';

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
});

const Spinner = () => (
  <View style={styles.container}>
    <Circle size={80} indeterminate color="#5AB5BF" borderWidth={8} />
  </View>
);

export { Spinner };
