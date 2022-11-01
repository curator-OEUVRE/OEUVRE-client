import MasonryList from '@react-native-seoul/masonry-list';
import { useCallback } from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';
import useDimensions from '@/hooks/useDimensions';
import type { PictureMini } from '@/types/floor';

interface Props {
  pictures: PictureMini[];
  onPicturePress?: (pictureNo: number) => void;
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'flex-end',
  },
});

interface CollectionItemProps {
  item: PictureMini;
  width: number;
  onPress?: (pictureNo: number) => void;
}

const CollectionItem = ({ item, onPress, width }: CollectionItemProps) => (
  <Pressable
    onPress={() => {
      onPress?.(item.pictureNo);
    }}
  >
    <Image
      style={[
        styles.image,
        {
          width: width * 0.45,
          height: (item.height / item.width) * width * 0.45,
          marginBottom: width * 0.1 * (1 / 3),
        },
      ]}
      source={{ uri: item.imageUrl }}
    />
  </Pressable>
);

const Collection = ({ pictures, onPicturePress }: Props) => {
  const { width } = useDimensions();

  const renderItem = useCallback(
    /* eslint-disable-next-line react/no-unused-prop-types */
    ({ item }: { item: PictureMini }) => (
      <CollectionItem item={item} onPress={onPicturePress} width={width} />
    ),
    [onPicturePress, width],
  );

  return (
    <MasonryList
      data={pictures}
      // 라이브러리의 타입 정의가 약간 이상함
      // @ts-ignore
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={{ paddingRight: width * 0.1 * (1 / 3) }}
    />
  );
};

export default Collection;
