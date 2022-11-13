import { useCallback } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SearchResultTemplate from './SearchResultTemplate';
import { searchFloors } from '@/apis/floor';
import { TEXT_STYLE } from '@/constants/styles';

interface FloorResult {
  floorNo: number;
  thumbnailUrl: string;
  floorName: string;
  exhibitionName: string;
}

interface FloorResultItemProps extends FloorResult {
  onPress?: (floorNo: number) => void;
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 12,
  },
  itemTextArea: {
    marginLeft: 12,
  },
  thumbnail: {
    height: 50,
    width: 50,
  },
});

const FloorResultItem = ({
  floorNo,
  thumbnailUrl,
  floorName,
  exhibitionName,
  onPress,
}: FloorResultItemProps) => (
  <Pressable
    style={styles.itemContainer}
    onPress={() => {
      onPress?.(floorNo);
    }}
  >
    <FastImage source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
    <View style={styles.itemTextArea}>
      <Text style={TEXT_STYLE.body14M}>{floorName}</Text>
      <Text style={TEXT_STYLE.body12M}>{exhibitionName}</Text>
    </View>
  </Pressable>
);

interface Props {
  keyword: string;
  onFloorPress?: (floorNo: number) => void;
}

const keyExtractor = (item: FloorResult) => `${item.floorNo}`;

const FloorSearchResult = ({ keyword, onFloorPress }: Props) => {
  const renderItem = useCallback(
    (props: ListRenderItemInfo<FloorResult>) => (
      <FloorResultItem {...props.item} onPress={onFloorPress} />
    ),
    [onFloorPress],
  );

  return (
    <SearchResultTemplate
      keyword={keyword}
      renderItem={renderItem}
      searchItems={searchFloors}
      keyExtractor={keyExtractor}
    />
  );
};

export default FloorSearchResult;
