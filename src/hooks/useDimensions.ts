import { Orientation } from 'expo-screen-orientation';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDeviceStore } from '@/states/deviceStore';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

/**
 * width, height은 항상 보이는 그대로의 가로/세로를 지칭.
 * 예를 들어 디바이스가 세로에서 가로로 바뀌면, 세로값이 가로값으로 바뀜
 */
export const useDimensions = () => {
  const { orientation } = useDeviceStore();
  const { top, bottom, left, right } = useSafeAreaInsets();

  const isLandscape =
    orientation === Orientation.LANDSCAPE_LEFT ||
    orientation === Orientation.LANDSCAPE_RIGHT;

  const width = isLandscape ? HEIGHT : WIDTH;
  const height = isLandscape ? WIDTH : HEIGHT;

  const widthOfSafeArea = width - left - right;
  const heightOfSafeArea = height - top - bottom;

  return {
    width,
    height,
    widthOfSafeArea,
    heightOfSafeArea,
  };
};

export default useDimensions;
