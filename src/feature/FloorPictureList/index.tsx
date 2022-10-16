import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import type { PictureInfo } from '@/states/createFloorStore';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  // contentContainer: {
  //   alignItems: 'center',
  // },
  flatList: {
    height: '100%',
  },
});

interface FloorPictureProps extends RenderItemParams<PictureInfo> {}

const FloorPicture = ({ item, drag }: FloorPictureProps) => {
  const [imageWidth, setImageWidth] = useState(100);
  const imageHeight = useMemo(() => width * (item.height / 100), [item.height]);

  useEffect(() => {
    Image.getSize(item.imageUri, (w, h) => {
      setImageWidth((w * imageHeight) / h);
    });
  }, [imageHeight, item.imageUri]);

  return (
    <ScaleDecorator>
      <Pressable
        style={{
          width: imageWidth,
          height: imageHeight,
          transform: [
            {
              translateY: item.location * width,
            },
          ],
        }}
        onLongPress={drag}
      >
        <Image
          source={{ uri: item.imageUri }}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />
      </Pressable>
    </ScaleDecorator>
  );
};

interface Props {
  pictures: PictureInfo[];
  editable?: boolean;
  setPictures?: (pictures: PictureInfo[]) => void;
}

const keyExtractor = (item: PictureInfo) => item.imageUri;

const FloorPictureList = ({ pictures }: Props) => {
  const renderItem = useCallback(
    (props: RenderItemParams<PictureInfo>) => <FloorPicture {...props} />,
    [],
  );

  return (
    <DraggableFlatList
      data={pictures}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      // contentContainerStyle={styles.contentContainer}
      style={styles.flatList}
    />
  );
};

export default FloorPictureList;
