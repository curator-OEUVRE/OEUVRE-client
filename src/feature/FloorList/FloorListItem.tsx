import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  type ListRenderItemInfo,
  Pressable,
} from 'react-native';
import {
  ScaleDecorator,
  type RenderItemParams,
} from 'react-native-draggable-flatlist';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import type { FloorMini } from '@/types/floor';

interface Props extends RenderItemParams<FloorMini> {
  editable?: boolean;
  onPress?: (floorNo: number) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    width: '100%',
  },
  contentContainer: {
    paddingLeft: 28,
    paddingRight: 13,
    paddingTop: 13,
  },
  flatList: {
    height: 143,
    width: '100%',
  },
  floorNameText: {
    color: COLOR.mono.gray7,
  },
  floorNoText: {
    color: COLOR.mono.gray3,
    marginRight: 4,
  },
  /* eslint-disable-next-line react-native/no-color-literals */
  image: {
    elevation: 6,
    height: 86,
    marginRight: 15,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  titleArea: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
});

const FloorImage = ({
  item,
}: ListRenderItemInfo<FloorMini['thumbnails'][number]>) => (
  <Image
    source={{ uri: item.imageUrl }}
    style={[styles.image, { width: (item.width / item.height) * 86 }]}
  />
);

const FloorListItem = ({ item, onPress, drag, editable }: Props) => (
  <ScaleDecorator>
    <Pressable
      onPress={() => {
        onPress?.(item.floorNo);
      }}
      onLongPress={editable ? drag : undefined}
    >
      <View style={[styles.container, { backgroundColor: item.color }]}>
        <View style={styles.titleArea}>
          <Text style={[TEXT_STYLE.body14R, styles.floorNoText]}>
            {item.queue}F
          </Text>
          <Text style={[TEXT_STYLE.body14R, styles.floorNameText]}>
            {item.name}
          </Text>
        </View>
        <FlatList
          horizontal
          style={styles.flatList}
          data={item.thumbnails}
          renderItem={FloorImage}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </Pressable>
  </ScaleDecorator>
);

export default FloorListItem;
