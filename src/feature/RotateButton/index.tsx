import {
  getOrientationAsync,
  lockAsync,
  Orientation,
  OrientationLock,
} from 'expo-screen-orientation';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import RotateIcon from '@/assets/icons/Rotate';
import { IconButton } from '@/components/Button';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    top: 8,
  },
});

const RotateButton = () => {
  const onPress = useCallback(async () => {
    const orientation = await getOrientationAsync();
    if (orientation < Orientation.LANDSCAPE_LEFT) {
      await lockAsync(OrientationLock.LANDSCAPE_RIGHT);
      return;
    }
    await lockAsync(OrientationLock.PORTRAIT_UP);
  }, []);
  return (
    <View style={styles.container}>
      <IconButton icon={<RotateIcon />} onPress={onPress} />
    </View>
  );
};

export default RotateButton;
