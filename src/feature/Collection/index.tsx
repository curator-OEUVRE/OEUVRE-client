import MasonryList from '@react-native-seoul/masonry-list';
import { useCallback } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import BookmarkFilledIcon from '@/assets/icons/BookmarkFilled';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import useDimensions from '@/hooks/useDimensions';
import type { PictureMini } from '@/types/floor';

interface Props {
  pictures: PictureMini[];
  refreshing?: boolean;
  onPicturePress?: (pictureNo: number) => void;
  onEndReached?: () => void;
  onRefresh?: () => void;
}

const styles = StyleSheet.create({
  emptyText: {
    color: COLOR.mono.gray4,
    paddingTop: 8,
  },
  image: {
    alignSelf: 'flex-end',
  },
  listEmptyComponent: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 67,
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
    <FastImage
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

const ListEmptyComponent = () => (
  <View style={styles.listEmptyComponent}>
    <BookmarkFilledIcon color={COLOR.mono.gray3} width={52} height={52} />
    <Text style={[TEXT_STYLE.body16M, styles.emptyText]}>
      컬렉션이 비어있어요
    </Text>
  </View>
);

const Collection = ({
  pictures,
  onPicturePress,
  refreshing,
  onEndReached,
  onRefresh,
}: Props) => {
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
      contentContainerStyle={{
        marginTop: width * 0.1 * (1 / 3),
        paddingRight: width * 0.1 * (1 / 3),
      }}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default Collection;
