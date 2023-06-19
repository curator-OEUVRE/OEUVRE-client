import {
  getOrientationAsync,
  lockAsync,
  Orientation,
  OrientationLock,
} from 'expo-screen-orientation';
import { useCallback } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RotateIcon from '@/assets/icons/Rotate';
import { IconButton } from '@/components/Button';

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    position: 'absolute',
  },
});

const RotateButton = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const bottom = isLandscape ? 21 : 53;
  const { right } = useSafeAreaInsets();
  const onPress = useCallback(async () => {
    const orientation = await getOrientationAsync();
    if (orientation < Orientation.LANDSCAPE_LEFT) {
      await lockAsync(OrientationLock.LANDSCAPE_RIGHT);
      return;
    }
    await lockAsync(OrientationLock.PORTRAIT_UP);
  }, []);
  return (
    <View style={[styles.container, { bottom, right }]}>
      <IconButton icon={<RotateIcon />} onPress={onPress} />
    </View>
  );
};

export default RotateButton;
