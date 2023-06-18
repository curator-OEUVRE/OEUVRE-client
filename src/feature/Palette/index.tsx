import { useCallback } from 'react';
import {
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import Paint from './Paint';
import { FLOOR_BACKGROUND_COLORS } from '@/constants/styles';
import { FloorBackgroundColor } from '@/types/floor';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 55,
    paddingTop: 5,
    width: 343,
  },
  // eslint-disable-next-line react-native/no-color-literals
  inner: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    height: 39,
    paddingLeft: 8,
    width: 266,
  },
  list: {
    flex: 1,
  },
});

interface PaletteProps {
  selectedColor: FloorBackgroundColor;
  onSelected?: (color: FloorBackgroundColor) => void;
}

const Palette = ({ selectedColor, onSelected }: PaletteProps) => {
  const keyExtractor = (item: FloorBackgroundColor, index: number) =>
    `paint_${item}_${index}`;
  const onPressPaint = useCallback(
    (color: FloorBackgroundColor) => {
      onSelected?.(color);
    },
    [onSelected],
  );
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<FloorBackgroundColor>) => (
      <Paint
        onPress={onPressPaint}
        color={item}
        selected={selectedColor === item}
      />
    ),
    [selectedColor, onPressPaint],
  );
  return (
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('@/assets/images/palette.png')}
      style={styles.container}
    >
      <View style={styles.inner}>
        <FlatList
          renderItem={renderItem}
          data={FLOOR_BACKGROUND_COLORS}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          windowSize={10}
          keyExtractor={keyExtractor}
          horizontal
          style={styles.list}
        />
      </View>
    </ImageBackground>
  );
};

export default Palette;
