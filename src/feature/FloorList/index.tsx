import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import DraggableFlatList, {
  type RenderItemParams,
  type DragEndParams,
} from 'react-native-draggable-flatlist';
import FloorListItem from './FloorListItem';
import type { FloorMini } from '@/types/floor';

interface Props {
  floors: FloorMini[];
  editable?: boolean;
  onFloorPress?: (floorNo: number) => void;
  onDragEnd?: (data: FloorMini[]) => void;
}

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  },
});

const keyExtractor = (item: FloorMini) => `${item.floorNo}`;

const FloorList = ({ floors, onFloorPress, onDragEnd, editable }: Props) => {
  const sortedFloors = useMemo(
    () => [...floors].sort((a, b) => (a.queue > b.queue ? -1 : 1)),
    [floors],
  );

  const renderItem = useCallback(
    (props: RenderItemParams<FloorMini>) => (
      <FloorListItem {...props} onPress={onFloorPress} editable={editable} />
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

  return (
    <DraggableFlatList
      data={sortedFloors}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onDragEnd={handleDragEnd}
      style={styles.flatList}
    />
  );
};

export default FloorList;
