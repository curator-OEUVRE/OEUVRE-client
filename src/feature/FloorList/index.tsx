import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import DraggableFlatList, {
  type RenderItemParams,
  type DragEndParams,
} from 'react-native-draggable-flatlist';
import FloorListItem from './FloorListItem';
import AddFloorIcon from '@/assets/icons/AddFloor';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import type { FloorMini } from '@/types/floor';

interface Props {
  floors: FloorMini[];
  editable?: boolean;
  refreshing?: boolean;
  onEndReached?: () => void;
  onFloorPress?: (floorNo: number) => void;
  onDragEnd?: (data: FloorMini[]) => void;
  onRefresh?: () => void;
}

const styles = StyleSheet.create({
  divider: {
    borderTopColor: COLOR.mono.gray1,
    borderTopWidth: 1,
    marginHorizontal: 20,
  },
  emptyText: {
    color: COLOR.mono.gray4,
    paddingTop: 8,
  },
  flatList: {
    height: '100%',
  },
  listEmptyComponent: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 67,
  },
});

const keyExtractor = (item: FloorMini) => `${item.floorNo}`;

const ListEmptyComponent = ({ editable }: { editable: boolean }) => (
  <View style={styles.listEmptyComponent}>
    <AddFloorIcon color={COLOR.mono.gray3} width={72} height={72} />
    <Text style={[TEXT_STYLE.body16M, styles.emptyText]}>
      {editable ? '새로운 플로어를 추가해 보세요' : '아직 플로어가 없어요'}
    </Text>
  </View>
);

const FloorList = ({
  floors,
  onFloorPress,
  onDragEnd,
  editable,
  refreshing,
  onEndReached,
  onRefresh,
}: Props) => {
  const sortedFloors = useMemo(
    () => [...floors].sort((a, b) => (a.queue > b.queue ? -1 : 1)),
    [floors],
  );

  const renderItem = useCallback(
    (props: RenderItemParams<FloorMini>) => (
      <>
        {props.getIndex() !== 0 && <View style={styles.divider} />}
        <FloorListItem
          {...props}
          item={{ ...props.item, color: COLOR.mono.white }}
          onPress={onFloorPress}
          editable={editable}
        />
      </>
    ),
    [onFloorPress, editable],
  );

  const handleDragEnd = useCallback(
    (params: DragEndParams<FloorMini>) => {
      const len = params.data.length;
      onDragEnd?.(
        params.data.map((floor, index) => ({ ...floor, queue: len - index })),
      );
    },
    [onDragEnd],
  );

  const renderListEmptyComponent = useCallback(
    () => <ListEmptyComponent editable={editable ?? false} />,
    [editable],
  );

  return (
    <DraggableFlatList
      data={sortedFloors}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onDragEnd={handleDragEnd}
      style={styles.flatList}
      ListEmptyComponent={renderListEmptyComponent}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={onRefresh}
      // 당겨서 새로고침이 안드로이드에서 작동하지 않을 수 있음
      // https://github.com/computerjazz/react-native-draggable-flatlist/issues/114
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing ?? false}
        />
      }
      maxToRenderPerBatch={5}
      initialNumToRender={5}
      windowSize={5}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FloorList;
