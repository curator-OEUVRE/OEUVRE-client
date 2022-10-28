/* eslint-disable no-param-reassign */
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { SharedValue } from 'react-native-reanimated';
import FloorPicture from './FloorPicture';
import useDimensions from '@/hooks/useDimensions';
import type { PictureInfo } from '@/states/createFloorStore';

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  },
});

interface Props {
  pictures: PictureInfo[];
  editable?: boolean;
  setPictures?: (newData: PictureInfo[]) => void;
  onDragEnd?: (absoluteX: number, absoluteY: number) => void;
  absoluteX: MutableRefObject<SharedValue<number> | undefined>;
  absoluteY: MutableRefObject<SharedValue<number> | undefined>;
  activeIndexAnim: MutableRefObject<SharedValue<number> | undefined>;
  isDragging: Readonly<SharedValue<boolean>>;
}

const keyExtractor = (item: PictureInfo): string => item.imageUri;

const FloorPictureList = ({
  pictures,
  editable,
  setPictures,
  onDragEnd,
  absoluteX,
  absoluteY,
  activeIndexAnim,
  isDragging,
}: Props) => {
  const { height } = useDimensions();

  const translateY = useRef<SharedValue<number>>();
  const [activeLine, setActiveLine] = useState(0);

  const renderItem = useCallback(
    (props: RenderItemParams<PictureInfo>) => (
      <FloorPicture
        {...props}
        isDragging={isDragging}
        editable={editable}
        activeLine={activeLine}
        setActiveLine={setActiveLine}
        activeIndexAnim={activeIndexAnim.current}
      />
    ),
    [isDragging, editable, activeLine, setActiveLine, activeIndexAnim],
  );

  return (
    <DraggableFlatList
      data={pictures}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      onDragEnd={({ data: newData, from, to }) => {
        const newPictures = newData.map((picture, index) =>
          // 순서를 바꾸지 않고 움직이기만 하면 y축 위치 변경
          index === to && from === to && translateY.current?.value !== undefined
            ? {
                ...picture,
                location: picture.location + translateY.current.value / height,
              }
            : // 순서가 바뀌면 y축 변화 무시
              picture,
        );

        setPictures?.(newPictures);
        onDragEnd?.(
          absoluteX.current?.value ?? 0,
          absoluteY.current?.value ?? 0,
        );
      }}
      onAnimValInit={(animVals) => {
        absoluteX.current = animVals.absoluteX;
        absoluteY.current = animVals.absoluteY;
        translateY.current = animVals.translateY;
        activeIndexAnim.current = animVals.activeIndexAnim;
      }}
      style={styles.flatList}
      /* eslint-disable-next-line react-native/no-inline-styles */
      contentContainerStyle={{ paddingHorizontal: editable ? 36 : 44 }}
    />
  );
};

export default FloorPictureList;
