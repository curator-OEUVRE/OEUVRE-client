import { Orientation } from 'expo-screen-orientation';
import { Dimensions } from 'react-native';
import { useDeviceStore } from '@/states/deviceStore';

interface Dimension {
  width: number;
  height: number;
}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

/**
 * width, height은 항상 보이는 그대로의 가로/세로를 지칭.
 * 예를 들어 디바이스가 세로에서 가로로 바뀌면, 세로값이 가로값으로 바뀜
 */
export const useDimensions = (): Dimension => {
  const { orientation } = useDeviceStore();

  const isLandscape =
    orientation === Orientation.LANDSCAPE_LEFT ||
    orientation === Orientation.LANDSCAPE_RIGHT;

  const width = isLandscape ? HEIGHT : WIDTH;
  const height = isLandscape ? WIDTH : HEIGHT;

  return {
    width,
    height,
  };
};

export default useDimensions;
