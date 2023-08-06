import { Asset } from 'expo-media-library';
import { useCallback } from 'react';
import {
  ImageBackground,
  Pressable,
  Text,
  useWindowDimensions,
  StyleSheet,
  View,
} from 'react-native';
import { COLOR } from '@/constants/styles';

interface ImageTileProps {
  image: Asset;
  selected: boolean;
  selectedItemIdx: number;
  onPress?: (image: Asset) => void;
}

const styles = StyleSheet.create({
  countBadge: {
    borderColor: COLOR.mono.white,
    borderRadius: 11,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    top: 4,
    width: 22,
  },
  countBadgeText: {
    alignSelf: 'center',
    color: COLOR.mono.white,
    fontWeight: 'bold',
    padding: 'auto',
  },
});

const ImageTile = ({
  image,
  selected,
  selectedItemIdx,
  onPress,
}: ImageTileProps) => {
  const { width } = useWindowDimensions();
  const SIZE = width / 3;
  const renderBadge = useCallback(() => {
    const backgroundColor = selected
      ? COLOR.system.blue
      : 'rgba(255, 255, 255, 0.3);';
    return (
      <View style={[styles.countBadge, { backgroundColor }]}>
        {selected && (
          <Text style={styles.countBadgeText}>{selectedItemIdx + 1}</Text>
        )}
      </View>
    );
  }, [selectedItemIdx, selected]);

  return (
    <Pressable
      onPress={() => {
        onPress?.(image);
      }}
    >
      <ImageBackground
        source={{ uri: image.uri }}
        style={{ width: SIZE, height: SIZE }}
      >
        {renderBadge()}
      </ImageBackground>
    </Pressable>
  );
};

export default ImageTile;
