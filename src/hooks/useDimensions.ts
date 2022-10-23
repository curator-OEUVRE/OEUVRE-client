import { Dimensions, Platform, useWindowDimensions } from 'react-native';

interface Dimension {
  width: number;
  height: number;
}

export const useDimensions = (): Dimension => {
  const { width, height } = useWindowDimensions();

  if (Platform.OS === 'android') {
    const windowWidth = Math.min(width, height);
    const windowHeight = Math.max(width, height);

    const screenWidth = Math.min(
      Dimensions.get('screen').width,
      Dimensions.get('screen').height,
    );

    const screenHeight = Math.max(
      Dimensions.get('screen').width,
      Dimensions.get('screen').height,
    );

    const isNormal = Math.abs(windowHeight - screenHeight) < 100;
    let calHeight = 0;

    if (isNormal) {
      calHeight = windowHeight;
    } else {
      calHeight = Math.max(windowHeight, screenHeight);
    }

    return {
      width: Math.min(windowWidth, screenWidth),
      height: calHeight,
    };
  }

  return {
    width,
    height,
  };
};

export default useDimensions;
