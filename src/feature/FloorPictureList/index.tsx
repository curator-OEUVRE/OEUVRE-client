/* eslint-disable no-param-reassign */
import { useCallback, useRef, useState, ReactNode } from 'react';
import { ScrollViewProps, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import FloorPicture from './FloorPicture';
import { FloorAlignment } from '@/types/floor';
import type { Picture } from '@/types/picture';

interface Props extends ScrollViewProps {
  pictures: Picture[];
  editable?: boolean;
  setPictures?: (newData: Picture[]) => void;
  addPictures?: (index: number) => void;
  onPressPicture?: (picture: Picture) => void;
  color?: string;
  onEndReached?: () => void;
  renderDescription?: (picture: Picture) => ReactNode;
  pictureAddable?: boolean;
  onPressDelete?: (picture: Picture) => void;
  onPinchEnd?: (index: number, scale: number) => void;
  alignment?: FloorAlignment;
}

interface Layout {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

const keyExtractor = (item: Picture, index: number): string =>
  `item_${index}_${item.pictureNo}`;

const FloorPictureList = ({
  pictures,
  editable,
  setPictures,
  addPictures,
  onPressPicture,
  color,
  onEndReached,
  renderDescription,
  pictureAddable,
  onPressDelete,
  onPinchEnd,
  alignment,
  ...scrollViewProps
}: Props) => {
  const translateY = useRef<SharedValue<number>>();
  const absoluteX = useRef<SharedValue<number>>();
  const absoluteY = useRef<SharedValue<number>>();
  const activeIndexAnim = useRef<SharedValue<number>>();
  const layoutRef = useSharedValue<Layout | undefined>(undefined);
  const isDragging = useDerivedValue(
    () =>
      activeIndexAnim.current?.value !== undefined &&
      activeIndexAnim.current.value !== -1,
  );
  const draggingPictureUrl = useDerivedValue(() => {
    if (!activeIndexAnim.current || activeIndexAnim.current.value < 0)
      return '';
    return pictures[activeIndexAnim.current.value].imageUrl;
  });

  const [activeLine, setActiveLine] = useState(-1);

  const onEnter = useDerivedValue(() => {
    const cx = absoluteX.current?.value;
    const cy = absoluteY.current?.value;
    if (!cx || !cy || !layoutRef.value || !isDragging.value) return false;
    const { pageX, pageY, width, height } = layoutRef.value;
    return (
      pageX <= cx && cx <= pageX + width && pageY <= cy && cy <= pageY + height
    );
  });

  const renderItem = useCallback(
    (props: RenderItemParams<Picture>) => (
      <FloorPicture
        {...props}
        addPictures={addPictures}
        isDragging={isDragging}
        editable={editable}
        activeLine={activeLine}
        setActiveLine={setActiveLine}
        activeIndexAnim={activeIndexAnim.current}
        onPressPicture={onPressPicture}
        onPressDelete={onPressDelete}
        color={color}
        renderDescription={renderDescription}
        pictureAddable={pictureAddable}
        onPinchEnd={onPinchEnd}
        alignment={alignment}
      />
    ),
    [
      isDragging,
      editable,
      activeLine,
      setActiveLine,
      activeIndexAnim,
      addPictures,
      onPressPicture,
      color,
      renderDescription,
      pictureAddable,
      onPressDelete,
      onPinchEnd,
      alignment,
    ],
  );

  const onDragEnd = (newData: Picture[]) => {
    if (onEnter.value && activeIndexAnim.current) {
      setPictures?.(
        newData.filter(
          (picture) => picture.imageUrl !== draggingPictureUrl.value,
        ),
      );
    } else {
      setPictures?.(newData);
    }
  };

  return (
    <View>
      <DraggableFlatList
        data={pictures}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        onDragEnd={({ data: newData }) => {
          onDragEnd(newData);
        }}
        onAnimValInit={(animVals) => {
          absoluteX.current = animVals.absoluteX;
          absoluteY.current = animVals.absoluteY;
          translateY.current = animVals.translateY;
          activeIndexAnim.current = animVals.activeIndexAnim;
        }}
        /* eslint-disable-next-line react-native/no-inline-styles */
        contentContainerStyle={{
          paddingHorizontal: editable ? 36 : 44,
        }}
        allowAnotherDirection
        maxToRenderPerBatch={7}
        initialNumToRender={7}
        windowSize={7}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        showsHorizontalScrollIndicator={false}
        {...scrollViewProps}
      />
    </View>
  );
};

export default FloorPictureList;
